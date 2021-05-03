import { Injectable } from '@nestjs/common';
import { CustomerEntity } from '../entity/customer.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class CustomerRepository extends BaseRepository {
  async fetchAll(): Promise<CustomerEntity[]> {
    return await this.selectQuery('SELECT * FROM CUSTOMER', (row) => {
      return new CustomerEntity(row.customer_id, row.first_name, row.last_name);
    });
  }
}
