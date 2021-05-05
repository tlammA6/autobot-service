import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { VehicleServiceService } from '../service/vehicle-service.service';
import { VehicleServiceEntity } from '../entity/vehicle-service.entity';

@Controller('vehicle-service')
export class VehicleServiceController {
  constructor(private readonly vehicleServiceService: VehicleServiceService) {}

  @Post()
  async create(@Body() vehicleService): Promise<VehicleServiceEntity> {
    return await this.vehicleServiceService.create(this.assign(vehicleService));
  }

  @Get()
  async findAll(): Promise<VehicleServiceEntity[]> {
    return await this.vehicleServiceService.findAll(new VehicleServiceEntity());
  }

  @Get(':vehicleServiceId')
  async findOne(
    @Param('vehicleServiceId') vehicleServiceId: string,
  ): Promise<VehicleServiceEntity> {
    const vehicleServiceEntity: VehicleServiceEntity = new VehicleServiceEntity();
    vehicleServiceEntity.vehicleServiceId = parseInt(vehicleServiceId);
    return await this.vehicleServiceService.findOne(vehicleServiceEntity);
  }

  @Put()
  async update(@Body() vehicleService): Promise<VehicleServiceEntity> {
    return await this.vehicleServiceService.update(this.assign(vehicleService));
  }

  @Delete(':vehicleServiceId')
  async delete(
    @Param('vehicleServiceId') vehicleServiceId: string,
  ): Promise<string> {
    await this.vehicleServiceService.delete(
      new VehicleServiceEntity(parseInt(vehicleServiceId)),
    );
    return 'success';
  }

  private assign(vehicleService): VehicleServiceEntity {
    /**
     * vehicleService param comes through as an Ojbect, thus we need to assign it to type VehicleServiceEntity
     * in order for the repository to infer the table and column names and to be able to dynamically set the entity's
     * member properties.
     **/
    return Object.assign(new VehicleServiceEntity(), vehicleService);
  }
}
