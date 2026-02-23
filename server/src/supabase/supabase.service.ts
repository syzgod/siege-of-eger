import { InternalServerErrorException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

import {
  GameStateSchema,
  type GameState,
} from '../../../shared/src/models/game-state.schema';

type Database = {
  public: {
    Tables: {
      game_state: {
        Row: GameState;
      };
    };
  };
};

@Injectable()
export class SupabaseService {
  // This is the main Supabase client used by this service.
  private readonly supabase: SupabaseClient<Database>;

  constructor(private readonly configService: ConfigService) {
    const url = this.configService.get<string>('SUPABASE_URL');
    const key = this.configService.get<string>('SUPABASE_KEY');

    if (!url || !key) {
      throw new Error(
        'Supabase URL and Key must be set in environment variables',
      );
    }
    this.supabase = createClient<Database>(url, key);
  }

  // Fetch the latest game state row from Supabase.
  async getGameState(): Promise<GameState> {
    const response = await this.supabase
      .from('game_state')
      .select('day, wood, iron, food, morale')
      .single();

    // If Supabase returns a database error, we stop here.
    if (response.error) {
      throw response.error;
    }

    // Validate DB payload with Zod before returning it.
    const parsedState = GameStateSchema.safeParse(response.data);

    if (!parsedState.success) {
      throw new InternalServerErrorException(
        'Supabase returned invalid game_state data',
      );
    }

    return parsedState.data;
  }
}
