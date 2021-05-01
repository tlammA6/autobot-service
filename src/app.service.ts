import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public async getServices(): Promise<string[]> {
    return ['Oil change', 'Tire Rotation'];
  }
}
