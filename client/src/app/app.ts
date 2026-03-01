import { Component, inject, signal } from '@angular/core';

import { CommanderOrders } from './features/dashboard/commander-orders/commander-orders';
import { GameApiService } from '@app/core/services/game-api.service';
import { GameStore } from './features/resources/store/game.store';
import { InventoryTabs } from './features/dashboard/inventory-tabs/inventory-tabs';
import { ProgressSpinner } from 'primeng/progressspinner';
import { StatusBar } from './features/dashboard/status-bar/status-bar';

@Component({
  selector: 'app-root',
  imports: [ProgressSpinner, StatusBar, InventoryTabs, CommanderOrders],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('siege-of-eger-client');

  private readonly gameApi = inject(GameApiService);
  protected readonly gameData = this.gameApi.gameState;
  private readonly gameStore = inject(GameStore);

  onAdvanceDay() {
    this.gameStore.advanceDay();
  }

  onBuild(structure: string) {
    console.log(`Building: ${structure}`);
  }

  onCraft(item: string) {
    console.log(`Crafting: ${item}`);
  }

  onTrain(unit: string) {
    this.gameStore.trainGuard();
    console.log(`Training: ${unit}`);
  }

  onRepair(target: string) {
    console.log(`Repairing: ${target}`);
  }
}
