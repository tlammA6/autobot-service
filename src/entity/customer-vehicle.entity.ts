import { BaseEntity } from './base.entity';

export class CustomerVehicleEntity extends BaseEntity {
  constructor(customerVehicleId?: number) {
    super();
    this.customerVehicleId = customerVehicleId;
  }

  customerVehicleId: number;
  customerId: number;
  year: number;
  make: string;
  model: string;
  trim: string;
  mileage: number;
  vin: string;
}
