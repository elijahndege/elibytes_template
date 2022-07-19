import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@Providers/typeorm/typeorm-ex.module';
import { LocalLoginRepository } from './repositories/local-login.repository';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([UserRepository, LocalLoginRepository]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, TypeOrmExModule],
})
export class UserModule {}
