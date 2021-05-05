import { Module } from '@nestjs/common';
import { VehicleServiceController } from './controller/vehicle-service.controller';
import { VehicleServiceService } from './service/vehicle-service.service';
import { VehicleServiceRepository } from './repository/vehicle-service.repository';
import { CustomerController } from './controller/customer.controller';
import { CustomerService } from './service/customer.service';
import { CustomerRepository } from './repository/customer.repository';

@Module({
  imports: [],
  controllers: [VehicleServiceController, CustomerController],
  providers: [
    VehicleServiceService,
    VehicleServiceRepository,
    CustomerService,
    CustomerRepository,
  ],
  exports: [VehicleServiceRepository],
})
export class AppModule {}
