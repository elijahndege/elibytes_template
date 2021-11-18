import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionRepository } from './repositories/permission.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      PermissionRepository
    ])
  ],
  controllers: [PermissionController],
  providers: [PermissionService]
})
export class PermissionModule {}
