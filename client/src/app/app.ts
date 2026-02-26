import { Component, inject, signal } from '@angular/core';

import { GameApiService } from '@app/core/services/game-api.service';
import { GameInfoBar } from './shared/components/game-info-bar/game-info-bar';
import { GameStore } from './features/resources/store/game.store';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-root',
  imports: [ProgressSpinner, GameInfoBar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('siege-of-eger-client');

  private readonly gameApi = inject(GameApiService);
  protected readonly gameData = this.gameApi.gameState;
  protected readonly gameStore = inject(GameStore);

  onNextDay() {
    this.gameStore.advanceDay();
  }
}
