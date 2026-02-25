import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
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
  private readonly supabase: SupabaseClient<Database>;
  // NestJS Logger is better than console.log: it includes timestamps and context.
  private readonly logger = new Logger(SupabaseService.name);

  constructor(private readonly configService: ConfigService) {
    const url = this.configService.get<string>('SUPABASE_URL');
    const key = this.configService.get<string>('SUPABASE_KEY');

    if (!url || !key) {
      this.logger.error('CRITICAL: Supabase credentials missing!');
      throw new Error(
        'Supabase URL and Key must be set in environment variables',
      );
    }
    this.supabase = createClient<Database>(url, key);
  }

  async getGameState(): Promise<GameState> {
    const { data, error } = await this.supabase
      .from('game_state')
      .select('*')
      .single();

    if (error) {
      this.logger.error(
        `Database Error: ${error.message} (Code: ${error.code})`,
      );

      if (error.code === 'PGRST116') {
        throw new NotFoundException(
          'No game state found. The fortress is empty.',
        );
      }

      throw new InternalServerErrorException(
        'The scribes are unable to retrieve the records.',
      );
    }

    const parsedState = GameStateSchema.safeParse(data);

    if (!parsedState.success) {
      this.logger.warn(
        `Schema Validation Failed: ${parsedState.error.message}`,
      );
      throw new InternalServerErrorException(
        'Data corruption detected in the game state.',
      );
    }

    return parsedState.data;
  }
}
