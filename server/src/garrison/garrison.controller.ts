import { Body, Controller, Get, Param, Post } from '@nestjs/common';
// Import your service here...
import { GarrisonService } from './garrison.service';
import { ZodValidationPipe } from 'nestjs-zod';
import { WorkerActionSchema } from '@eger/shared';
import type { WorkerActionDTO } from '@eger/shared';

@Controller('game') // This is your existing controller
export class GarrisonController {
  constructor(
    // 1. Inject your new service right alongside any existing ones
    private readonly garrisonService: GarrisonService,
  ) {}

  // 2. Add this temporary test route
  // The endpoint will be: GET http://localhost:3000/game/test-troops/:campaignId
  @Get('test-troops/:campaignId')
  async testHydratedTroops(@Param('campaignId') campaignId: string) {
    console.log(`Fetching joined data for match: ${campaignId}`);
    return await this.garrisonService.fetchActiveTroopForMatch(campaignId);
  }

  @Post('assign')
  assignWorker(
    @Body(new ZodValidationPipe(WorkerActionSchema))
    workerPayload: WorkerActionDTO,
  ) {
    // This is where you would implement the logic to assign a worker to a task.
    // For now, it's just a placeholder.
    console.log('Incoming valid payload:', workerPayload);
    return this.garrisonService.handleWorkerAction(workerPayload);
  }
}
