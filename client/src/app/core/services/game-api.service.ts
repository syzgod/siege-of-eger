import { Campaign, CampaignSchema } from '@shared/schemas/campaign.schema';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { httpResource } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GameApiService {
  readonly gameState = httpResource<Campaign>(() => `${environment.apiUrl}/game/resources`, {
    parse: (raw: unknown) => CampaignSchema.parse(raw),
  });
}
