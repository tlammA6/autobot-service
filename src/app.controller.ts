import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomerEntity } from './entity/customer.entity';
import { ServiceEntity } from './entity/service.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/services')
  async getServices(): Promise<ServiceEntity[]> {
    return this.appService.getServices();
  }

  @Get('/customers')
  async getCustomers(): Promise<CustomerEntity[]> {
    return this.appService.getCustomers();
  }
}
