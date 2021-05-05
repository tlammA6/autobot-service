export class CustomerVehicleEntity {
  constructor(
    customerVehicleId?: number,
    customerId?: number,
    year?: number,
    make?: string,
    model?: string,
    trim?: string,
    mileage?: number,
    vin?: string,
  ) {
    this.customerVehicleId = customerVehicleId;
    this.customerId = customerId;
    this.year = year;
    this.make = make;
    this.model = model;
    this.trim = trim;
    this.mileage = mileage;
    this.vin = vin;
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
