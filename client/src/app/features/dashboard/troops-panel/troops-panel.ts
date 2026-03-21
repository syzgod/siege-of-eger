import { Component, computed, inject } from '@angular/core';
import { StatCard, StatCardData } from '@app/shared/components/stat-card/stat-card';

import { GameStore } from '@app/features/resources/store/game.store';

@Component({
  selector: 'app-troops-panel',
  standalone: true,
  imports: [StatCard],
  templateUrl: './troops-panel.html',
  styleUrl: './troops-panel.scss',
})
export class TroopsPanel {
  private readonly store = inject(GameStore);

  protected readonly items = computed<StatCardData[]>(() => {
    const s = this.store.gameState();
    return [
      {
        label: 'Guards',
        icon: '🛡️',
        value: '--',
        accentColor: 'var(--color-iron)',
      },
      {
        label: 'Soldiers',
        icon: '⚔️',
        value: '--',
        accentColor: 'var(--color-iron)',
      },
      {
        label: 'Archers',
        icon: '🏹',
        value: '--',
        accentColor: 'var(--color-iron)',
      },
    ];
  });
}
