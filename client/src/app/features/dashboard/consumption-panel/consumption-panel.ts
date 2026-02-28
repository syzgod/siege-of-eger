import { Component, computed, inject } from '@angular/core';
import { StatCard, StatCardData } from '@app/shared/components/stat-card/stat-card';

import { GameStore } from '@app/features/resources/store/game.store';

@Component({
  selector: 'app-consumption-panel',
  standalone: true,
  imports: [StatCard],
  template: `
    <ul class="grid grid-cols-2 sm:grid-cols-4 gap-4 list-none m-0 p-0" role="list">
      @for (item of items(); track item.label) {
        <li>
          <app-stat-card [data]="item" />
        </li>
      }
    </ul>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }
  `,
})
export class ConsumptionPanel {
  private readonly store = inject(GameStore);

  protected readonly items = computed<StatCardData[]>(() => {
    const s = this.store.gameState();
    const troops =
      (s?.military?.guards ?? 0) + (s?.military?.soldiers ?? 0) + (s?.military?.archers ?? 0);

    return [
      {
        label: 'Water',
        icon: '💧',
        value: s != null ? Math.round(troops * 1.5) : '--',
        accentColor: '#4a90d9',
      },
      {
        label: 'Food',
        icon: '🍖',
        value: s != null ? Math.round(troops * 2) : '--',
        accentColor: 'var(--color-blood)',
      },
      {
        label: 'Ale',
        icon: '🍺',
        value: s != null ? Math.round(troops * 0.5) : '--',
        accentColor: 'var(--color-gold)',
      },
      {
        label: 'Medical',
        icon: '🩹',
        value: s != null ? Math.round(troops * 0.3) : '--',
        accentColor: '#8d8d8d',
      },
    ];
  });
}
