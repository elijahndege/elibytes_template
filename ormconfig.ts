import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

const configs: TypeOrmModuleOptions & { seeds: string[]; factories: string[] } =
{
    type: 'postgres',
    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: ['src/**/*.entity{.ts,.js}'],
    migrations: ['dist/src/database/migrations/*{.ts,.js}'],
    cli: {
        migrationsDir: 'src/database/migrations'
    },
    seeds: ['database/seeds/**/*{.ts,.js}'],
    factories: ['database/factories/**/*{.ts,.js}'],
    logging: true
};

module.exports = configs;