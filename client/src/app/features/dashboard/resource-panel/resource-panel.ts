import { Component, computed, inject } from '@angular/core';
import { StatCard, StatCardData } from '@app/shared/components/stat-card/stat-card';

import { GameStore } from '@app/features/resources/store/game.store';

@Component({
  selector: 'app-resource-panel',
  standalone: true,
  imports: [StatCard],
  templateUrl: './resource-panel.html',
  styleUrl: './resource-panel.scss',
})
export class ResourcePanel {
  private readonly store = inject(GameStore);

  protected readonly items = computed<StatCardData[]>(() => {
    const s = this.store.gameState();
    return [
      {
        label: 'Gold',
        icon: '🪙',
        value: '--',
        accentColor: 'var(--color-gold)',
        rate: 1,
      },
      {
        label: 'Wood',
        icon: '🪵',
        value: '--',
        accentColor: 'var(--color-wood)',
        rate: 1,
      },
      {
        label: 'Iron',
        icon: '⛏️',
        value: '--',
        accentColor: 'var(--color-iron)',
        rate: 1,
      },
      {
        label: 'Stone',
        icon: '🪨',
        value: '--',
        accentColor: '#8d8d8d',
        rate: 1,
      },
      {
        label: 'Food',
        icon: '🍖',
        value: '--',
        accentColor: 'var(--color-blood)',
        rate: 1,
      },
    ];
  });
}
