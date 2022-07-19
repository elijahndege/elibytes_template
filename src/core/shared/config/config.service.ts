import { Inject, Injectable } from '@nestjs/common';
import { BaseConfigService } from './base-config.service';

@Injectable()
export class ConfigService {
  env: any;
  constructor(
    @Inject('CONFIG_OPTIONS') configs,
    private readonly baseConfig: BaseConfigService,
  ) {
    this.env = this.baseConfig.validateInput(configs);
    console.info('[this.env]-----', this.env);
  }
  get appName(): string {
    return String(this.env.APP_NAME);
  }
  get appUrl(): string {
    return String(this.env.APP_URL);
  }
  get clientUrl(): string {
    return String(this.env.CLIENT_URL);
  }
  get appEnv(): string {
    return String(this.env.APP_ENV);
  }
  get port(): number {
    return Number(this.env.APP_PORT);
  }
  get transportPort(): number {
    return Number(this.env.TRANSPORT_PORT);
  }
  get jwtTTL(): string {
    return String(this.env.JWT_TTL);
  }
  get jwtSecret(): string {
    return String(this.env.JWT_SECRET);
  }
  get jwtRefreshTTL(): string {
    return String(this.env.JWT_REFRESH_TTL);
  }
  get emailTokenTtl(): number {
    return Number(this.env.EMAIL_TOKEN_TTL);
  }

  get databaseHost(): string {
    return String(this.env.TYPEORM_HOST);
  }

  get databasePort(): number {
    return Number(this.env.TYPEORM_PORT);
  }

  get databaseName(): string {
    return String(this.env.TYPEORM_DATABASE);
  }

  get databaseUser(): string {
    return String(this.env.TYPEORM_USERNAME);
  }
  get databasePassword(): string {
    return String(this.env.TYPEORM_PASSWORD);
  }

  get typeormLogging(): boolean {
    return Boolean(this.env.TYPEORM_LOGGING);
  }

  get typeormMigrationsrun(): boolean {
    return Boolean(this.env.TYPEORM_MIGRATIONSRUN);
  }

  get emailHost(): string {
    return String(this.env.EMAIL_HOST);
  }

  get emailPort(): string {
    return String(this.env.EMAIL_PORT);
  }

  get emailUser(): string {
    return String(this.env.MAIL_USERNAME);
  }
  get senderEmail(): string {
    return String(this.env.MAIL_FROM_ADDRESS);
  }
  get emailPass(): string {
    return String(this.env.MAIL_PASSWORD);
  }

  get redisUrl(): string {
    return String(this.env.REDIS_URL);
  }

  get baseFolder(): string {
    const regex = /core+(\/|\\)+shared+(\/|\\)+config/gi;
    return __dirname.replace(regex, '');
  }

  get rootFolder(): string {
    const regex = /dist+(\/|\\)+shared+(\/|\\)+services/gi;
    console.log(__dirname);
    console.log(__dirname.replace(regex, ''));
    return __dirname.replace(regex, '');
  }

  get throttleTtl(): number {
    return Number(this.env.THROTTLE_TTL);
  }

  get throttleLimit(): number {
    return Number(this.env.THROTTLE_LIMIT);
  }

  get allowedOrigins(): RegExp {
    return new RegExp(this.env.ALLOWED_ORIGINS);
  }
}
