import { BaseEntity } from './base.entity';
import { Entity } from './entity';

export class ServiceAppointmentEntity extends BaseEntity implements Entity {
  constructor(serviceAppointmentId?: number) {
    super();
    this.serviceAppointmentId = serviceAppointmentId;
  }

  serviceAppointmentId: number;
  customerVehicleId: string;
  vehicleServiceId: string;
  serviceDate: Date;
}
