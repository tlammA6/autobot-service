import { Injectable } from '@nestjs/common';
import { CustomerEntity } from '../entity/customer.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class CustomerRepository extends BaseRepository<CustomerEntity> {
  createEntity(row: any): CustomerEntity {
    return new CustomerEntity(row.customer_id, row.first_name, row.last_name);
  }
}
