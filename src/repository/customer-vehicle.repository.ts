import { Injectable } from '@nestjs/common';
import { CustomerVehicleEntity } from '../entity/customer-vehicle.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class CustomerVehicleRepository extends BaseRepository<CustomerVehicleEntity> {
  TABLE_NAME = 'CUSTOMER_VEHICLE';
  PRIMARY_KEY = 'CUSTOMER_VEHICLE_ID';

  createEntity(row: any): CustomerVehicleEntity {
    return new CustomerVehicleEntity(
      row.customer_vehicle_d,
      row.customer_id,
      row.year,
      row.make,
      row.model,
      row.trim,
      row.mileage,
      row.vin,
    );
  }

  updateFields(entity: CustomerVehicleEntity): string {
    return `customer_vehicle_id = ${entity.customerVehicleId}
     customer_id = ${entity.customerId}
     year = ${entity.year} 
     make = '${entity.make}'
     model = '${entity.model}' 
     trim = '${entity.mileage}' 
     mileage = ${entity.mileage} 
     vin = '${entity.vin}' `;
  }
}
