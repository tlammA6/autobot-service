import { Injectable } from '@nestjs/common';
import { CustomerVehicleEntity } from '../entity/customer-vehicle.entity';
import { CustomerVehicleRepository } from '../repository/customer-vehicle.repository';

@Injectable()
export class CustomerVehicleService {
  constructor(
    private readonly customerVehicleRepository: CustomerVehicleRepository,
  ) {}

  public async create(
    customerVehicleEntity: CustomerVehicleEntity,
  ): Promise<CustomerVehicleEntity> {
    return await this.customerVehicleRepository.create(customerVehicleEntity);
  }

  public async findAll(
    customerVehicleEntity: CustomerVehicleEntity,
  ): Promise<CustomerVehicleEntity[]> {
    return this.customerVehicleRepository.findAll(customerVehicleEntity);
  }

  public async findOne(
    customerVehicleEntity: CustomerVehicleEntity,
  ): Promise<CustomerVehicleEntity> {
    return this.customerVehicleRepository.findOne(customerVehicleEntity);
  }

  async update(
    customerVehicleEntity: CustomerVehicleEntity,
  ): Promise<CustomerVehicleEntity> {
    await this.customerVehicleRepository.update(customerVehicleEntity);
    return this.findOne(customerVehicleEntity);
  }

  async delete(customerVehicleEntity: CustomerVehicleEntity): Promise<void> {
    return await this.customerVehicleRepository.delete(customerVehicleEntity);
  }
}
