import {
  DeepPartial,
  DeleteResult,
  FindOneOptions,
  FindOptionsWhere,
  ObjectID,
} from 'typeorm';
import { BaseFilterDto } from '../common/dtos/filter-many';
import { CrudRepository } from './base-repo';

/**
 * @Usage Base service class for crud purposes. Please extend from this class when creating new service classes and add additional methods if needed.
 */
export class CrudService<T> {
  constructor(private baseRepository: CrudRepository<T>) {}

  createOne(dto: DeepPartial<T>): Promise<T> {
    return this.baseRepository.createOne(dto);
  }

  async findMany(param: BaseFilterDto) {
    const data = await this.baseRepository.findMany(param);
    const totalPageCount = data[1] / (param.limit || 5);
    const result = {
      data: data[0],
      count: data[0].length,
      total: data[1],
      page: Number(param.page || 1),
      pageCount: Math.ceil(totalPageCount ? totalPageCount : 0),
    };

    return result;
  }

  updateOne(options: FindOneOptions<T>, dto: DeepPartial<T>): Promise<T> {
    return this.baseRepository.updateOne(options, dto);
  }

  deleteOne(
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
    exception = false,
  ): Promise<DeleteResult> {
    return this.baseRepository.deleteOne(criteria);
  }

  /**
   * @Usage Finds first entity that matches given options. Finds first entity that matches given conditions.
   */
  findOneOrFail(options: FindOneOptions<T>): Promise<T>;

  async findOneOrFail(options?: FindOneOptions<T>): Promise<T> {
    return this.baseRepository.findOneOrFail(options);
  }

  /**
   * @Usage Finds first entity that matches given conditions.
   */
  findOne(options: FindOneOptions<T>): Promise<T | null>;

  async findOne(options?: FindOneOptions<T>): Promise<T | null> {
    return this.baseRepository.findOne(options);
  }
}
