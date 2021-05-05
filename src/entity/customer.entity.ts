import { BaseEntity } from './base.entity';

export class CustomerEntity extends BaseEntity {
  constructor(customerId?: number) {
    super();
    this.customerId = customerId;
  }

  customerId: number;
  firstName: string;
  lastName: string;
}
