import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@Providers/typeorm/typeorm-ex.module';
import { RoleRepository } from './repositories/role.repository';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([RoleRepository])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
