import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '../repository/customer.repository';

@Injectable()
export class TestService {
  constructor(private readonly customerRepository: CustomerRepository) {}
}
