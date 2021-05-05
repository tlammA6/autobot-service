import { Injectable } from '@nestjs/common';
import { ServiceAppointmentEntity } from '../entity/service-appointment.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class ServiceAppointmentRepository extends BaseRepository<ServiceAppointmentEntity> {
  // This is needed in order for the BaseRepository to create a new entity of this Type.
  createType(): ServiceAppointmentEntity {
    return new ServiceAppointmentEntity();
  }

  /** This was needed to allow both Entity interface & Generic Type to both work in the base.repository.
   *  Will look into better solution
   * */
  convertToEntity(
    serviceAppointmentEntity: ServiceAppointmentEntity,
  ): ServiceAppointmentEntity {
    return serviceAppointmentEntity;
  }
}
