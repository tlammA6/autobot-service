export class VehicleServiceEntity {
  constructor(vehicleServiceId?: number) {
    this.vehicleServiceId = vehicleServiceId;
  }

  vehicleServiceId: number;
  name: string;
  price: number;
}
