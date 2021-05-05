import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ServiceAppointmentService } from '../service/service-appointment.service';
import { ServiceAppointmentEntity } from '../entity/service-appointment.entity';

@Controller('service-appointment')
export class ServiceAppointmentController {
  constructor(
    private readonly serviceAppointmentService: ServiceAppointmentService,
  ) {}

  @Post()
  async create(@Body() serviceAppointment): Promise<ServiceAppointmentEntity> {
    return await this.serviceAppointmentService.create(
      this.assign(serviceAppointment),
    );
  }

  @Get()
  async findAll(): Promise<ServiceAppointmentEntity[]> {
    return await this.serviceAppointmentService.findAll(
      new ServiceAppointmentEntity(),
    );
  }

  @Get(':serviceAppointmentId')
  async findOne(
    @Param('serviceAppointmentId') serviceAppointmentId: string,
  ): Promise<ServiceAppointmentEntity> {
    return await this.serviceAppointmentService.findOne(
      new ServiceAppointmentEntity(parseInt(serviceAppointmentId)),
    );
  }

  @Put()
  async update(@Body() serviceAppointment): Promise<ServiceAppointmentEntity> {
    return await this.serviceAppointmentService.update(
      this.assign(serviceAppointment),
    );
  }

  @Delete(':serviceAppointmentId')
  async delete(
    @Param('serviceAppointmentId') serviceAppointmentId: string,
  ): Promise<string> {
    await this.serviceAppointmentService.delete(
      new ServiceAppointmentEntity(parseInt(serviceAppointmentId)),
    );
    return 'success';
  }

  private assign(serviceAppointment): ServiceAppointmentEntity {
    /**
     * vehicleService param comes through as an Ojbect, thus we need to assign it to type ServiceAppointmentEntity
     * in order for the repository to infer the table and column names and to be able to dynamically set the entity's
     * member properties.
     **/
    return Object.assign(new ServiceAppointmentEntity(), serviceAppointment);
  }
}
