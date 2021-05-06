import { Controller, Get, Query } from '@nestjs/common';
import { UtteranceService } from '../service/utterance.service';

@Controller('interaction')
export class UtteranceController {
  constructor(private readonly utteranceService: UtteranceService) {}

  @Get()
  async process(utterance: string): Promise<any> {
    return await this.utteranceService.process('hello');
  }
}
