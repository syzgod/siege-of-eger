import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

import { ConfigService } from '@nestjs/config';
import { RawCampaignSchema } from '@eger/shared';
import { z } from 'zod';

type RawGameState = z.infer<typeof RawCampaignSchema>;

type Database = {
  public: {
    Tables: {
      campaigns: {
        Row: RawGameState;
      };
    };
  };
};

@Injectable()
export class SupabaseService {
  private readonly supabase: SupabaseClient<Database>;
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

  async getGameState(): Promise<RawGameState> {
    const { data, error } = await this.supabase
      .from('campaigns')
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

    const parsedState = RawCampaignSchema.safeParse(data);

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
