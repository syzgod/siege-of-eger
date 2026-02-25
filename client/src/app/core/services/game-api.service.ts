import { GameState, GameStateSchema } from '@shared/models/game-state.schema';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { httpResource } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GameApiService {
  readonly gameState = httpResource<GameState>(() => `${environment.apiUrl}/game/resources`, {
    parse: (raw: unknown) => GameStateSchema.parse(raw),
  });
}
