export class CustomerEntity {
  constructor(customerId?: number) {
    this.customerId = customerId;
  }

  customerId: number;
  firstName: string;
  lastName: string;
}
