import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CustomerService } from '../service/customer.service';
import { CustomerEntity } from '../entity/customer.entity';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async create(@Body() customer): Promise<CustomerEntity> {
    return await this.customerService.create(this.assign(customer));
  }

  @Get()
  async findAll(): Promise<CustomerEntity[]> {
    return await this.customerService.findAll(new CustomerEntity());
  }

  @Get(':customerId')
  async findOne(
    @Param('customerId') customerId: string,
  ): Promise<CustomerEntity> {
    return await this.customerService.findOne(
      new CustomerEntity(parseInt(customerId)),
    );
  }

  @Put()
  async update(@Body() customer): Promise<CustomerEntity> {
    return await this.customerService.update(this.assign(customer));
  }

  @Delete(':customerId')
  async delete(@Param('customerId') customerId: string): Promise<string> {
    await this.customerService.delete(new CustomerEntity(parseInt(customerId)));
    return 'success';
  }

  private assign(customer): CustomerEntity {
    /**
     * vehicleService param comes through as an Ojbect, thus we need to assign it to type CustomerEntity
     * in order for the repository to infer the table and column names.
     **/
    return Object.assign(new CustomerEntity(), customer);
  }
}
