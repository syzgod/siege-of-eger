import { Component, inject, signal } from '@angular/core';

import { GameApiService } from '@app/core/services/game-api.service';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-root',
  imports: [ProgressSpinner],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('siege-of-eger-client');

  private readonly gameApi = inject(GameApiService);
  protected readonly gameData = this.gameApi.gameState;
}
