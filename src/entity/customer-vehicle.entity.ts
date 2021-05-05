export class CustomerVehicleEntity {
  constructor(customerVehicleId?: number) {
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
