import { Component, computed, inject } from '@angular/core';
import { StatCard, StatCardData } from '@app/shared/components/stat-card/stat-card';

import { GameStore } from '@app/features/resources/store/game.store';

@Component({
  selector: 'app-armory-panel',
  standalone: true,
  imports: [StatCard],
  templateUrl: './armory-panel.html',
  styleUrl: './armory-panel.scss',
})
export class ArmoryPanel {
  private readonly store = inject(GameStore);

  protected readonly items = computed<StatCardData[]>(() => {
    const s = this.store.gameState();
    return [
      {
        label: 'Swords',
        icon: '⚔️',
        value: '--',
        accentColor: 'var(--color-iron)',
      },
      {
        label: 'Spears',
        icon: '🔱',
        value: '--',
        accentColor: 'var(--color-wood)',
      },
      {
        label: 'Bows',
        icon: '🏹',
        value: '--',
        accentColor: 'var(--color-wood)',
      },
    ];
  });
}
