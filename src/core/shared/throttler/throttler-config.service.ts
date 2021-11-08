import { Injectable } from "@nestjs/common";
import { ThrottlerModuleOptions, ThrottlerOptionsFactory } from "@nestjs/throttler";
import { ConfigService } from "@src/core/shared/config/config.service";
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';

@Injectable()
export class ThrottlerConfigService implements ThrottlerOptionsFactory {
    constructor(private readonly config: ConfigService) {

    }
    createThrottlerOptions(): ThrottlerModuleOptions {
        return <ThrottlerModuleOptions>{
            ttl: this.config.throttleTtl,
            limit: this.config.throttleLimit,
            storage: new ThrottlerStorageRedisService(),
        }
    }
}