import { Injectable } from '@nestjs/common';
import { Interactions } from 'aws-amplify';

@Injectable()
export class UtteranceService {
  public async process(utterance: string): Promise<any> {
    return await Interactions.send('ScheduleAppointment_dev', utterance);
    // return await Interactions.send('autobot', utterance);
  }
}
