import { Global, Module } from '@nestjs/common';
import { PostgresConfigService } from './postgres/postgres-config.service';
import { RedisService } from './redis/redis.service';
import { ThrottlerConfigService } from './throttler/throttler-config.service';
import { BaseConfigService } from './config/base-config.service';
import { ConfigService } from './config/config.service';

@Global()
@Module({
  providers: [
    PostgresConfigService, 
    ThrottlerConfigService, 
    RedisService,
    ConfigService,
    BaseConfigService,
    {
        provide: 'CONFIG_OPTIONS',
        useFactory: (baseConfigService: BaseConfigService) =>
            baseConfigService.getEnvironmentVariables(),
        inject: [BaseConfigService],
    },
  ],
  exports:[PostgresConfigService, ConfigService, ThrottlerConfigService, RedisService]
})
export class SharedModule {}
