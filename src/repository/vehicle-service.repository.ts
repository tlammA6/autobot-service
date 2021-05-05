import { Injectable } from '@nestjs/common';
import { VehicleServiceEntity } from '../entity/vehicle-service.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class VehicleServiceRepository extends BaseRepository<VehicleServiceEntity> {
  createEntity(): VehicleServiceEntity {
    return new VehicleServiceEntity();
  }
}
