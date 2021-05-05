import { Injectable } from '@nestjs/common';
import { CustomerVehicleEntity } from '../entity/customer-vehicle.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class CustomerVehicleRepository extends BaseRepository<CustomerVehicleEntity> {
  // This is needed in order for the BaseRepository to create a new entity of this Type.
  createType(): CustomerVehicleEntity {
    return new CustomerVehicleEntity();
  }

  /** This was needed to allow both Entity interface & Generic Type to both work in the base.repository.
   *  Will look into better solution
   * */
  convertToEntity(
    customerVehicleEntity: CustomerVehicleEntity,
  ): CustomerVehicleEntity {
    return customerVehicleEntity;
  }
}
