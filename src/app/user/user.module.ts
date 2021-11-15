import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { LocalLoginRepository } from './repositories/local-login.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      UserRepository,
      LocalLoginRepository
    ])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService, TypeOrmModule]
})
export class UserModule {}
