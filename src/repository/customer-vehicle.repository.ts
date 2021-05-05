import { Injectable } from '@nestjs/common';
import { CustomerVehicleEntity } from '../entity/customer-vehicle.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class CustomerVehicleRepository extends BaseRepository<CustomerVehicleEntity> {
  createEntity(): CustomerVehicleEntity {
    return new CustomerVehicleEntity();
  }
}
