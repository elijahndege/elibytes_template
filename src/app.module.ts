import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './app/users/users.module';
import { RolesModule } from './app/roles/roles.module';
import { PermissionsModule } from './app/permissions/permissions.module';
import { AuthModule } from './app/auth/auth.module';
import { CommandsModule } from './core/commands/commands.module';
import {ThrottlerModule} from '@nestjs/throttler'
import { SharedModule } from './core/shared/shared.module';
import { ThrottlerConfigService } from './core/shared/throttler/throttler-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './core/shared/postgres/postgres-config.service';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [SharedModule],
      useClass: ThrottlerConfigService,
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useExisting: PostgresConfigService,
    }),
    UsersModule,
    RolesModule,
    PermissionsModule,
    AuthModule,
    CommandsModule,
    SharedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
