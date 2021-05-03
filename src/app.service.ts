import { Injectable } from '@nestjs/common';
import { ServiceEntity } from './entity/service.entity';
import { ServiceRepository } from './repository/service.repository';
import { CustomerEntity } from './entity/customer.entity';
import { CustomerRepository } from './repository/customer.respository';

@Injectable()
export class AppService {
  constructor(
    private readonly serviceRepository: ServiceRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}

  public async getServices(): Promise<ServiceEntity[]> {
    return this.serviceRepository.fetchAll();
  }

  public async getCustomers(): Promise<CustomerEntity[]> {
    return this.customerRepository.fetchAll();
  }
}
