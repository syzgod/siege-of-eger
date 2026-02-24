import { Component, resource, signal } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { GameStateSchema, type GameState } from '@shared/models/game-state.schema';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('siege-of-eger-client');

  gameData = resource({
    loader: async (): Promise<GameState> => {
      const response = await fetch(`${environment.apiUrl}/game/resources`);

      if (!response.ok) {
        throw new Error(`Failed to fetch game resources (Status: ${response.status})`);
      }
      const data: unknown = await response.json();
      return GameStateSchema.parse(data);
    },
  });
}
