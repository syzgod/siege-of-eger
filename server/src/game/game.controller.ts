import { Controller, Get } from '@nestjs/common';

import { SupabaseService } from '../supabase/supabase.service'; // Adjust path if needed

@Controller('game')
export class GameController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Get('resources')
  async getResources() {
    return await this.supabaseService.getGameState();
  }
}
