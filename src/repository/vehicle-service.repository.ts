import { Injectable } from '@nestjs/common';
import { VehicleServiceEntity } from '../entity/vehicle-service.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class VehicleServiceRepository extends BaseRepository<VehicleServiceEntity> {
  // This is needed in order for the BaseRepository to create a new entity of this Type.
  createType(): VehicleServiceEntity {
    return new VehicleServiceEntity();
  }

  /** This was needed to allow both Entity interface & Generic Type to both work in the base.repository.
   *  Will look into better solution
   * */
  convertToEntity(
    vehicleServiceEntity: VehicleServiceEntity,
  ): VehicleServiceEntity {
    return vehicleServiceEntity;
  }
}
