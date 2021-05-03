export class CustomerEntity {
  constructor(customerId?: number, firstName?: string, lastName?: string) {
    this.customerId = customerId;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  customerId: number;
  firstName: string;
  lastName: string;
}
