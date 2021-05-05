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
import { ServiceAppointmentController } from './controller/service-appointment.controller';
import { ServiceAppointmentService } from './service/service-appointment.service';
import { ServiceAppointmentRepository } from './repository/service-appointment.repository';
import { TestController } from './controller/test.controller';
import { TestService } from './service/test.service';

@Module({
  imports: [],
  controllers: [
    VehicleServiceController,
    CustomerController,
    CustomerVehicleController,
    ServiceAppointmentController,
    TestController,
  ],
  providers: [
    VehicleServiceService,
    VehicleServiceRepository,
    CustomerService,
    CustomerRepository,
    CustomerVehicleService,
    CustomerVehicleRepository,
    ServiceAppointmentService,
    ServiceAppointmentRepository,
    TestService,
  ],
  exports: [],
})
export class AppModule {}
