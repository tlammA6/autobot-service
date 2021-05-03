import { Injectable } from '@nestjs/common';
import { ServiceEntity } from '../entity/service.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class ServiceRepository extends BaseRepository {
  async fetchAll(): Promise<ServiceEntity[]> {
    return await this.selectQuery('SELECT * FROM SERVICE', (row) => {
      return new ServiceEntity(row.service_id, row.name, row.price);
    });
  }
}
