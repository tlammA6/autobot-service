import { BaseEntity } from './base.entity';
import { Entity } from './entity';

export class VehicleServiceEntity extends BaseEntity implements Entity {
  constructor(vehicleServiceId?: number) {
    super();
    this.vehicleServiceId = vehicleServiceId;
  }

  vehicleServiceId: number;
  name: string;
  price: number;
}
