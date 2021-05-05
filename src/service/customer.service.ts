import { Injectable } from '@nestjs/common';
import { CustomerEntity } from '../entity/customer.entity';
import { CustomerRepository } from '../repository/customer.repository';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  public async create(customerEntity: CustomerEntity): Promise<CustomerEntity> {
    return await this.customerRepository.create(customerEntity);
  }

  public async findAll(
    customerEntity: CustomerEntity,
  ): Promise<CustomerEntity[]> {
    return this.customerRepository.findAll(customerEntity);
  }

  public async findOne(
    customerEntity: CustomerEntity,
  ): Promise<CustomerEntity> {
    return this.customerRepository.findOne(customerEntity);
  }

  async update(customerEntity: CustomerEntity): Promise<CustomerEntity> {
    await this.customerRepository.update(customerEntity);
    return this.findOne(customerEntity);
  }

  async delete(customerEntity: CustomerEntity): Promise<void> {
    return await this.customerRepository.delete(customerEntity);
  }
}
