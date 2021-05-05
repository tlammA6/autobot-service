import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CustomerVehicleService } from '../service/customer-vehicle.service';
import { CustomerVehicleEntity } from '../entity/customer-vehicle.entity';

@Controller('customer-vehicle')
export class CustomerVehicleController {
  constructor(
    private readonly customerVehicleService: CustomerVehicleService,
  ) {}

  @Post()
  async create(@Body() customerVehicle): Promise<CustomerVehicleEntity> {
    return await this.customerVehicleService.create(
      this.assign(customerVehicle),
    );
  }

  @Get()
  async findAll(): Promise<CustomerVehicleEntity[]> {
    return await this.customerVehicleService.findAll(
      new CustomerVehicleEntity(),
    );
  }

  @Get(':customerVehicleId')
  async findOne(
    @Param('customerVehicleId') customerVehicleId: string,
  ): Promise<CustomerVehicleEntity> {
    return await this.customerVehicleService.findOne(
      new CustomerVehicleEntity(parseInt(customerVehicleId)),
    );
  }

  @Put()
  async update(@Body() customerVehicle): Promise<CustomerVehicleEntity> {
    return await this.customerVehicleService.update(
      this.assign(customerVehicle),
    );
  }

  @Delete(':customerVehicleId')
  async delete(
    @Param('customerVehicleId') customerVehicleId: string,
  ): Promise<string> {
    await this.customerVehicleService.delete(
      new CustomerVehicleEntity(parseInt(customerVehicleId)),
    );
    return 'success';
  }

  private assign(customerVehicle): CustomerVehicleEntity {
    /**
     * vehicleService param comes through as an Ojbect, thus we need to assign it to type CustomerVehicleEntity
     * in order for the repository to infer the table and column names.
     **/
    return Object.assign(new CustomerVehicleEntity(), customerVehicle);
  }
}
