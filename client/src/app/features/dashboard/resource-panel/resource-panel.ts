import { Component, computed, inject } from '@angular/core';
import { StatCard, StatCardData } from '@app/shared/components/stat-card/stat-card';

import { GameStore } from '@app/features/resources/store/game.store';

@Component({
  selector: 'app-resource-panel',
  standalone: true,
  imports: [StatCard],
  template: `
    <ul class="grid grid-cols-3 sm:grid-cols-6 gap-4 list-none m-0 p-0" role="list">
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
export class ResourcePanel {
  private readonly store = inject(GameStore);

  protected readonly items = computed<StatCardData[]>(() => {
    const s = this.store.gameState();
    return [
      {
        label: 'Gold',
        icon: '🪙',
        value: s?.resources?.gold ?? '--',
        accentColor: 'var(--color-gold)',
        rate: s?.gold_rate,
      },
      {
        label: 'Wood',
        icon: '🪵',
        value: s?.resources?.wood ?? '--',
        accentColor: 'var(--color-wood)',
        rate: s?.wood_rate,
      },
      {
        label: 'Iron',
        icon: '⛏️',
        value: s?.resources?.iron ?? '--',
        accentColor: 'var(--color-iron)',
        rate: s?.iron_rate,
      },
      {
        label: 'Stone',
        icon: '🪨',
        value: s?.resources?.stone ?? '--',
        accentColor: '#8d8d8d',
        rate: s?.stone_rate,
      },
      {
        label: 'Food',
        icon: '🍖',
        value: s?.resources?.food ?? '--',
        accentColor: 'var(--color-blood)',
        rate: s?.food_rate,
      },
      {
        label: 'Swords',
        icon: '⚔️',
        value: s?.resources?.swords ?? '--',
        accentColor: 'var(--color-iron)',
      },
    ];
  });
}
