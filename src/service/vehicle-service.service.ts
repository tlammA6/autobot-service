import { Injectable } from '@nestjs/common';
import { VehicleServiceEntity } from '../entity/vehicle-service.entity';
import { VehicleServiceRepository } from '../repository/vehicle-service.repository';

@Injectable()
export class VehicleServiceService {
  constructor(
    private readonly vehicleServiceRepository: VehicleServiceRepository,
  ) {}

  public async create(
    vehicleServiceEntity: VehicleServiceEntity,
  ): Promise<VehicleServiceEntity> {
    return await this.vehicleServiceRepository.create(vehicleServiceEntity);
  }

  public async findAll(
    vehicleServiceEntity: VehicleServiceEntity,
  ): Promise<VehicleServiceEntity[]> {
    return this.vehicleServiceRepository.findAll(vehicleServiceEntity);
  }

  public async findOne(
    vehicleServiceEntity: VehicleServiceEntity,
  ): Promise<VehicleServiceEntity> {
    return this.vehicleServiceRepository.findOne(vehicleServiceEntity);
  }

  async update(
    vehicleServiceEntity: VehicleServiceEntity,
  ): Promise<VehicleServiceEntity> {
    await this.vehicleServiceRepository.update(vehicleServiceEntity);
    return this.findOne(vehicleServiceEntity);
  }

  async delete(vehicleServiceEntity: VehicleServiceEntity): Promise<void> {
    return await this.vehicleServiceRepository.delete(vehicleServiceEntity);
  }
}
