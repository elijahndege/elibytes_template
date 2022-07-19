import { Injectable, Logger } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';
import * as util from 'util';
import { ConfigService } from '../config/config.service';

export type ConnectionOptions = string | RedisOptions;

@Injectable()
export class RedisService {
  client: Redis;
  logger = new Logger(RedisService.name);

  constructor(private readonly configs: ConfigService) {
    this.client = this.initializeClient(this.configs.redisUrl);
    this.client.ping((err, result) => {
      this.logger.log(`${result} : Redis database Connected`);
    });
    this.client.on('ready', () => {
      this.logger.log(`Redis service initialized`);
    });
    this.client.on('error', (err) => {
      this.logger.error({ message: 'Redis encountered an error : ', err });
    });
  }

  initializeClient(redisOpts?: ConnectionOptions) {
    return new Redis(redisOpts as string);
  }

  async set(key: string, value: any): Promise<string> {
    return await this.client.set(key, value);
  }

  async setEx(key: string, seconds: number, value: any): Promise<string> {
    return await this.client.setex(key, seconds, value);
  }

  async get(key: string): Promise<string> {
    return await this.client.get(key);
  }

  async addExpiryByKey(key: string, seconds: number): Promise<any> {
    return this.client.expire(key, seconds);
  }

  async createList(key: string, value: any): Promise<any> {
    return await this.client.rpush(key, value);
  }

  async addToExistingList(key: string, value: any): Promise<any> {
    const setAsync = util.promisify(this.client.rpush).bind(this.client);
    return await setAsync(key, value);
  }

  async createOrUpdateList(
    key: string,
    seconds: number,
    value: any,
  ): Promise<any> {
    const existingValue = await this.keyExists(key);
    let saved = false;
    if (existingValue) {
      saved = await this.addToExistingList(key, value);
    } else {
      saved = await this.createList(key, value);
    }
    return saved ? await this.addExpiryByKey(key, seconds) : false;
  }

  async getList(key: string): Promise<any[]> {
    const setLengthAsync = util.promisify(this.client.llen).bind(this.client);
    const length = await setLengthAsync(key);

    const setAsync = util.promisify(this.client.lrange).bind(this.client);
    const list = await setAsync(key, 0, length - 1);
    return list;
  }
  async getExistingListLegnthByKey(key: string): Promise<number> {
    return await this.client.llen(key);
  }
  async keyExists(key: string) {
    const getAsync = util.promisify(this.client.exists).bind(this.client);
    const exists = await getAsync(key);
    return exists;
  }

  async searchById(key: string): Promise<Record<string, string>> {
    return await this.client.hgetall(key);
  }

  async updateExpiryTime(key: string, seconds: number): Promise<any> {
    return await this.client.expire(key, seconds);
  }

  async deleteById(key: string): Promise<number> {
    return await this.client.del(key);
  }
}
