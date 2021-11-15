import { Global, Module } from '@nestjs/common';
import { PostgresConfigService } from './postgres/postgres-config.service';
import { RedisService } from './redis/redis.service';
import { ThrottlerConfigService } from './throttler/throttler-config.service';
import { BaseConfigService } from './config/base-config.service';
import { ConfigService } from './config/config.service';
import { JwtConfigService } from './jwt/jwt-config.service';

@Global()
@Module({
  providers: [
    PostgresConfigService, 
    ThrottlerConfigService, 
    RedisService,
    ConfigService,
    BaseConfigService,
    JwtConfigService,
    {
        provide: 'CONFIG_OPTIONS',
        useFactory: (baseConfigService: BaseConfigService) =>
            baseConfigService.getEnvironmentVariables(),
        inject: [BaseConfigService],
    },
  ],
  exports:[PostgresConfigService, ConfigService, ThrottlerConfigService, RedisService, JwtConfigService]
})
export class SharedModule {}
