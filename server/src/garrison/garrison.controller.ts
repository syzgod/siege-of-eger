import { Controller, Get, Param } from '@nestjs/common';
// Import your service here...
import { GarrisonService } from './garrison.service';

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
}
