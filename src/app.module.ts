import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './app/auth/auth.module';
import { CommandsModule } from './core/commands/commands.module';
import {ThrottlerModule} from '@nestjs/throttler'
import { SharedModule } from './core/shared/shared.module';
import { ThrottlerConfigService } from './core/shared/throttler/throttler-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './core/shared/postgres/postgres-config.service';
import { RoleModule } from './app/role/role.module';
import { PermissionModule } from './app/permission/permission.module';
import { HealthModule } from './app/health/health.module';
import { ObjectModule } from './app/subject/subject.module';

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
    UserModule,
    AuthModule,
    CommandsModule,
    SharedModule,
    RoleModule,
    PermissionModule,
    HealthModule,
    ObjectModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
