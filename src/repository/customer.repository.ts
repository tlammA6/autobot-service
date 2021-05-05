import { Injectable } from '@nestjs/common';
import { CustomerEntity } from '../entity/customer.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class CustomerRepository extends BaseRepository<CustomerEntity> {
  createEntity(): CustomerEntity {
    return new CustomerEntity();
  }
}
