import { Component, resource, signal } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { GameStateSchema, type GameState } from '@shared/models/game-state.schema';

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
      const response = await fetch('http://localhost:3000/game/resources');
      const data: unknown = await response.json();
      return GameStateSchema.parse(data);
    },
  });
}
