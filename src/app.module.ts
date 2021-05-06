import { Module } from '@nestjs/common';
import Amplify, {Interactions } from 'aws-amplify';
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
import { UtteranceController } from './controller/utterance.controller';
import { UtteranceService } from './service/utterance.service';

Amplify.configure({
  Auth: {
    identityPoolId: 'us-east-1:faf5edda-9150-4549-a846-e4a5ea7b5278',
    region: 'us-east-1'
  },
  Interactions: {
    bots: {
      "ScheduleAppointment_dev": {
        "name": "ScheduleAppointment_dev",
        "alias": "$LATEST",
        "region": "us-east-1",
      },
      "autobot": {
        "name": "autobot",
        "alias": "$LATEST",
        "region": "us-east-1",
      },
    }
  }
});

@Module({
  imports: [],
  controllers: [
    VehicleServiceController,
    CustomerController,
    CustomerVehicleController,
    ServiceAppointmentController,
    TestController,
    UtteranceController,
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
    UtteranceService,
  ],
  exports: [],
})
export class AppModule {}
