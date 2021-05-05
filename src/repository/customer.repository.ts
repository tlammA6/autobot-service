import { Injectable } from '@nestjs/common';
import { CustomerEntity } from '../entity/customer.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class CustomerRepository extends BaseRepository<CustomerEntity> {
  // This is needed in order for the BaseRepository to create a new entity of this Type.
  createType(): CustomerEntity {
    return new CustomerEntity();
  }

  /** This was needed to allow both Entity interface & Generic Type to both work in the base.repository.
   *  Will look into better solution
   * */
  convertToEntity(customerEntity: CustomerEntity): CustomerEntity {
    return customerEntity;
  }
}
