import { CrudService } from '@Core/abstracts/base-service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalLogin } from './entities/local-login.entity';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService extends CrudService<User> {
  constructor(private userRepository: UserRepository) {
    super(userRepository);
  }

  async createOne(createUserDto: CreateUserDto): Promise<User> {
    await this.userRepository.checkDuplicateEmail(createUserDto.email);
    createUserDto.localLogin = new LocalLogin({
      password: createUserDto.password,
    });
    return super.createOne(createUserDto);
  }

  // async updateOne(id: number, dto: UpdateUserDTO): Promise<User> {
  //   await this.repo.checkDuplicateEmail(dto.email);
  //   const roles = await this.roleRepository.findByIds(dto.roleIds);
  //   dto.roles = roles;
  //   return super.updateOne(id, dto);
  // }
}
