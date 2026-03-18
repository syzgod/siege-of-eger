import { HydratedTroop, HydratedTroopDto } from '@eger/shared';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { WorkerActionDTO } from '@eger/shared';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

@Injectable()
export class GarrisonService {
  private readonly supabase!: ReturnType<typeof createClient>;

  constructor(private readonly configService: ConfigService) {
    const url = this.configService.get<string>('SUPABASE_URL');
    const key = this.configService.get<string>('SUPABASE_KEY');

    if (!url || !key) {
      throw new Error('Supabase credentials missing');
    }
    this.supabase = createClient(url, key);
  }

  async fetchActiveTroopForMatch(campaignId: string): Promise<HydratedTroop[]> {
    const { data, error } = await this.supabase
      .from('campaign_units')
      .select(
        `
      id,
      campaignId:campaign_id,
      headcount:headcount,
      experience:experience,
      blueprint:unit_templates (
      id,
      label,
      basePower:base_power
      )
      `,
      )
      .eq('campaign_id', campaignId);

    if (error) {
      console.error('Supabase Error:', error);
      throw new InternalServerErrorException('Failed to fetch troop data');
    }

    try {
      const validatedData = z.array(HydratedTroopDto).parse(data);
      return validatedData;
    } catch (validationError) {
      console.error('Zod Validation Failed:', validationError);
      throw new InternalServerErrorException('Database schema mismatch');
    }
  }
  handleWorkerAction(data: WorkerActionDTO) {
    console.log(`Task ${data.action} added to ${data.workerId}`);
    return {
      status: 'success',
      message: 'Action added to the worker successfully',
      data: data,
    };
  }
}
