import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerRepository } from './repository/customer.respository';
import { ServiceRepository } from './repository/service.repository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ServiceRepository, CustomerRepository],
  exports: [ServiceRepository],
})
export class AppModule {}
