export class VehicleServiceEntity {
  constructor(vehicleServiceId?: number, name?: string, price?: number) {
    this.vehicleServiceId = vehicleServiceId;
    this.name = name;
    this.price = price;
  }
  vehicleServiceId: number;
  name: string;
  price: number;
}
