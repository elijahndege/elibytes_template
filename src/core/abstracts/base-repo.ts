import { NotFoundException } from "@nestjs/common";
import { Repository, DeepPartial, ObjectID, FindOneOptions, FindConditions, DeleteResult } from "typeorm";
import { HTTP_MESSAGE } from "../common/constants/error-message";
import { BaseFilterDto } from "../common/dtos/filter-many";
import { FilterBuilder } from "./filter-builder";


/**
 * @Usage Base repository class for crud purposes. Please extend from this class when creating new repository classes and add additional methods if needed.
 */
export class CrudRepository<T> extends Repository<T> {
  createOne(dto: DeepPartial<T>): Promise<T> {
    const entity = this.create(dto);
    return this.save(entity);
  }

  findOneOrFail(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<T>,
  ): Promise<T>;
  findOneOrFail(options?: FindOneOptions<T>): Promise<T>;
  findOneOrFail(
    conditions?: FindConditions<T>,
    options?: FindOneOptions<T>,
  ): Promise<T>;

  async findOneOrFail(
    conditions?: any,
    options?: FindOneOptions<T>,
  ): Promise<T> {
    try {
      return super.findOneOrFail(conditions, options);
    } catch {
      throw new NotFoundException(HTTP_MESSAGE.NOT_FOUND);
    }
  }

  async findMany(param: BaseFilterDto): Promise<[T[], number]> {
    return new FilterBuilder(param).getQueryBuilder<T>(this).getManyAndCount();
  }

  async updateOne(id: number, dto: DeepPartial<T>): Promise<T> {
    let entity = await this.findOneOrFail(id);
    entity = {
      ...entity,
      ...dto,
    };
    return this.save(entity);
  }

  async deleteOne(id: number, exception = false): Promise<DeleteResult> {
    if (exception) {
      await this.findOneOrFail(id);
    }
    return this.delete(id);
  }
}