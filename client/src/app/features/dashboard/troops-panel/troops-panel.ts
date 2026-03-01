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
        value: s?.military?.guards ?? '--',
        accentColor: 'var(--color-iron)',
      },
      {
        label: 'Soldiers',
        icon: '⚔️',
        value: s?.military?.soldiers ?? '--',
        accentColor: 'var(--color-iron)',
      },
      {
        label: 'Archers',
        icon: '🏹',
        value: s?.military?.archers ?? '--',
        accentColor: 'var(--color-iron)',
      },
    ];
  });
}
