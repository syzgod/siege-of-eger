import { Component, computed, inject } from '@angular/core';
import { StatCard, StatCardData } from '@app/shared/components/stat-card/stat-card';

import { GameStore } from '@app/features/resources/store/game.store';

@Component({
  selector: 'app-population-panel',
  standalone: true,
  imports: [StatCard],
  templateUrl: './population-panel.html',
  styleUrl: './population-panel.scss',
})
export class PopulationPanel {
  private readonly store = inject(GameStore);

  protected readonly items = computed<StatCardData[]>(() => {
    const s = this.store.gameState();
    const peasants = 0;
    const civilians = 0;
    const wounded = 0;

    return [
      {
        label: 'Peasants',
        icon: '🧑‍🌾',
        value: s != null ? peasants : '--',
        accentColor: 'var(--color-wood)',
      },
      {
        label: 'Civilians',
        icon: '👥',
        value: s != null ? civilians : '--',
        accentColor: 'var(--color-iron)',
      },
      {
        label: 'Wounded',
        icon: '🩹',
        value: s != null ? wounded : '--',
        accentColor: 'var(--color-blood)',
      },
      {
        label: 'Total',
        icon: '🏘️',
        value: s != null ? peasants + civilians + wounded : '--',
        accentColor: 'var(--color-gold)',
      },
    ];
  });
}
