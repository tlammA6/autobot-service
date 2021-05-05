import { Controller, Get } from '@nestjs/common';
import { InteractionsService } from '../service/interactions.service';

@Controller('interactions')
export class InteractionsController {
  constructor(private readonly interactionsService: InteractionsService) {}

  @Get()
  async generalTest(): Promise<any> {
    return await this.interactionsService.interaction();
  }
}
