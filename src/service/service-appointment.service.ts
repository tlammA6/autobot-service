import { Injectable } from '@nestjs/common';
import { ServiceAppointmentEntity } from '../entity/service-appointment.entity';
import { ServiceAppointmentRepository } from '../repository/service-appointment.repository';

@Injectable()
export class ServiceAppointmentService {
  constructor(
    private readonly serviceAppointmentRepository: ServiceAppointmentRepository,
  ) {}

  public async create(
    serviceAppointmentEntity: ServiceAppointmentEntity,
  ): Promise<ServiceAppointmentEntity> {
    return await this.serviceAppointmentRepository.create(
      serviceAppointmentEntity,
    );
  }

  public async findAll(
    serviceAppointmentEntity: ServiceAppointmentEntity,
  ): Promise<ServiceAppointmentEntity[]> {
    return this.serviceAppointmentRepository.findAll(serviceAppointmentEntity);
  }

  public async findOne(
    serviceAppointmentEntity: ServiceAppointmentEntity,
  ): Promise<ServiceAppointmentEntity> {
    return this.serviceAppointmentRepository.findOne(serviceAppointmentEntity);
  }

  async update(
    serviceAppointmentEntity: ServiceAppointmentEntity,
  ): Promise<ServiceAppointmentEntity> {
    await this.serviceAppointmentRepository.update(serviceAppointmentEntity);
    return this.findOne(serviceAppointmentEntity);
  }

  async delete(
    serviceAppointmentEntity: ServiceAppointmentEntity,
  ): Promise<void> {
    return await this.serviceAppointmentRepository.delete(
      serviceAppointmentEntity,
    );
  }
}
