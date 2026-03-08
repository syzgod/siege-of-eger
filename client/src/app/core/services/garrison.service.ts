import { HydratedTroop } from '@eger/shared';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { httpResource } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GarrisonService {
  private readonly apiUrl = 'http://localhost:3000/garrison';

  readonly garrisonResource = httpResource<HydratedTroop[]>(() => `${environment.apiUrl}/garrison`);
}
