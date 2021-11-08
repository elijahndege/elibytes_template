import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@src/core/shared/config/config.service';
import Redis from 'ioredis';


@Injectable()
export class RedisService {
    client: Redis.Redis;

    constructor(private readonly _configs: ConfigService) {
        this.client = this.initializeClient('[RedisService]');
    }

    initializeClient(
        serviceName: string,
        enableOffline = true,
        db = 0,
    ) {
        const client = new Redis(
            this._configs.getRedisOptions(enableOffline, db),
        );
        client.ping((err, result) => {
            Logger.log(`${result} : Redis database Connected`);
        })
        
        client.on('ready', () => {
            Logger.log(`${serviceName} : Redis service initialized`);

        });

        client.on('error', err => {
            Logger.error({ message: 'Redis encountered an error : ', err });
        });

        return client;
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

    async addExpiryByKey(
        key: string,
        seconds: number,
    ): Promise<Redis.BooleanResponse> {
        return this.client.expire(key, seconds);
    }

    async createList(key: string, value: any[]): Promise<number> {
        return await this.client.rpush(key, value);
    }

    async addToExistingList(key: string, value: any): Promise<number> {
        return await this.client.rpush(key, value);
    }

    async getExistingListLegnthByKey(key: string): Promise<number> {
        return await this.client.llen(key);
    }

    async searchById(key: string): Promise<Record<string, string>> {
        return await this.client.hgetall(key);
    }

    async updateExpiryTime(
        key: string,
        seconds: number,
    ): Promise<Redis.BooleanResponse> {
        return await this.client.expire(key, seconds);
    }

    async deleteById(key: string): Promise<number> {
        return await this.client.del(key);
    }
}