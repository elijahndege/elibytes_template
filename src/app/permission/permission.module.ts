import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@Providers/typeorm/typeorm-ex.module';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { PermissionRepository } from './repositories/permission.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([PermissionRepository])],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
