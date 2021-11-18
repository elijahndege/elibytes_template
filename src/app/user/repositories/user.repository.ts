import { BadRequestException } from "@nestjs/common";
import { CrudRepository } from "@src/core/abstracts/base-repo";
import { FilterBuilder } from "@src/core/abstracts/filter-builder";
import { HTTP_MESSAGE } from "@src/core/common/constants/error-message";
import { EntityRepository } from "typeorm";
import { FilterUserDto } from "../dto/filter-user.dto";
import { User } from "../entities/user.entity";

@EntityRepository(User)
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
      .where("user.email LIKE :email", { email: `%${param.email || ""}%` })
      .getManyAndCount();
  }
}