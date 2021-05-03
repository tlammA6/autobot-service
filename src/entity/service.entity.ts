export class ServiceEntity {
  constructor(serviceId?: number, name?: string, price?: number) {
    this.serviceId = serviceId;
    this.name = name;
    this.price = price;
  }
  serviceId: number;
  name: string;
  price: number;
}
