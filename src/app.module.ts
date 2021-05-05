import { Module } from '@nestjs/common';
import { VehicleServiceController } from './controller/vehicle-service.controller';
import { VehicleServiceService } from './service/vehicle-service.service';
import { VehicleServiceRepository } from './repository/vehicle-service.repository';
import { CustomerController } from './controller/customer.controller';
import { CustomerService } from './service/customer.service';
import { CustomerRepository } from './repository/customer.repository';
import { CustomerVehicleController } from './controller/customer-vehicle.controller';
import { CustomerVehicleService } from './service/customer-vehicle.service';
import { CustomerVehicleRepository } from './repository/customer-vehicle.repository';

@Module({
  imports: [],
  controllers: [
    VehicleServiceController,
    CustomerController,
    CustomerVehicleController,
  ],
  providers: [
    VehicleServiceService,
    VehicleServiceRepository,
    CustomerService,
    CustomerRepository,
    CustomerVehicleService,
    CustomerVehicleRepository,
  ],
  exports: [VehicleServiceRepository],
})
export class AppModule {}
