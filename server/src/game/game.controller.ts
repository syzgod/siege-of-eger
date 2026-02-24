import { Controller, Get } from '@nestjs/common';

import { SupabaseService } from '../supabase/supabase.service';

type GameState = Awaited<ReturnType<SupabaseService['getGameState']>>;

@Controller('game')
export class GameController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Get('resources')
  async getResources(): Promise<GameState> {
    return await this.supabaseService.getGameState();
  }
}
