import { NotFoundException } from '@nestjs/common';
import {
  DeepPartial,
  DeleteResult,
  FindOneOptions,
  FindOptionsWhere,
  ObjectID,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { HTTP_MESSAGE } from '../common/constants/error-message';
import { BaseFilterDto } from '../common/dtos/filter-many';
import { FilterBuilder } from './filter-builder';

/**
 * @Usage Base repository class for crud purposes. Please extend from this class when creating new repository classes and add additional methods if needed.
 */
export class CrudRepository<T> extends Repository<T> {
  createOne(dto: DeepPartial<T>): Promise<T> {
    const entity = this.create(dto);
    return this.save(entity);
  }

  findOneOrFail(options: FindOneOptions<T>): Promise<T>;

  async findOneOrFail(options: FindOneOptions<T>): Promise<T> {
    try {
      return super.findOneOrFail(options);
    } catch {
      throw new NotFoundException(HTTP_MESSAGE.NOT_FOUND);
    }
  }

  async findMany(param: BaseFilterDto): Promise<[T[], number]> {
    return new FilterBuilder(param).getQueryBuilder<T>(this).getManyAndCount();
  }

  getAll(): SelectQueryBuilder<T> {
    return this.getQueryBuilder<T>(this);
  }

  public getQueryBuilder<T>(repo: Repository<T>): SelectQueryBuilder<T> {
    const qb: SelectQueryBuilder<T> = repo.createQueryBuilder(
      repo.metadata.targetName,
    );
    return qb;
  }
  async updateOne(options: FindOneOptions<T>, dto: DeepPartial<T>): Promise<T> {
    let entity = await this.findOneOrFail(options);
    entity = {
      ...entity,
      ...dto,
    };
    return this.save(entity);
  }

  async deleteOne(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindOptionsWhere<T>,
  ): Promise<DeleteResult> {
    return this.delete(criteria);
  }
}
