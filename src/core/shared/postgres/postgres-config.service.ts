import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { ConfigService } from "../config/config.service";

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory{
    constructor(private readonly config: ConfigService) {

    }
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return <TypeOrmModuleOptions>{
            type: 'postgres',
            host: this.config.databaseHost,
            port: this.config.databasePort,
            username: this.config.databaseUser,
            password: this.config.databasePassword,
            database: this.config.databaseName,
            entities: [
                this.config.baseFolder + '/modules/**/*.entity{.ts,.js}',
            ],
            migrations: [
                this.config.baseFolder + '/database/migrations/**/*{.ts,.js}',
            ],
            cli: {
                migrationsDir: this.config.baseFolder + '/database/migrations',
            },
            subscribers: [
                this.config.baseFolder + '/modules/**/*.subscriber{.ts,.js}',
            ],
            synchronize: false,
            migrationsRun: this.config.typeormMigrationsrun,
            logging: this.config.typeormLogging,
        };
    }
}