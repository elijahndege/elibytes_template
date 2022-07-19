import { CrudRepository } from '@Core/abstracts/base-repo';
import { FilterBuilder } from '@Core/abstracts/filter-builder';
import { HTTP_MESSAGE } from '@Core/common/constants/error-message';
import { CustomRepository } from '@Core/common/decorators/typeorm-ex.decorator';
import { BadRequestException } from '@nestjs/common';
import { FilterUserDto } from '../dto/filter-user.dto';
import { User } from '../entities/user.entity';

@CustomRepository(User)
export class UserRepository extends CrudRepository<User> {
  async checkDuplicateEmail(email: string) {
    const isUserExists = await this.findOne({
      where: {
        email: email,
      },
    });
    if (isUserExists) {
      throw new BadRequestException(HTTP_MESSAGE.DUPLICATED);
    }
  }

  async findMany(param: FilterUserDto): Promise<[User[], number]> {
    return new FilterBuilder(param)
      .getQueryBuilder<User>(this)
      .where('user.email LIKE :email', { email: `%${param.email || ''}%` })
      .getManyAndCount();
  }

  async findPermissions(userId: string): Promise<User> {
    return this.findOne({
      where: {
        id: userId,
      },
      relations: {
        roles: {
          permissions: true,
        },
      },
    });
  }
}
