import { Component, computed, inject } from '@angular/core';
import { StatCard, StatCardData } from '@app/shared/components/stat-card/stat-card';

import { GameStore } from '@app/features/resources/store/game.store';

@Component({
  selector: 'app-troops-panel',
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
      {
        label: 'Morale',
        icon: '🔥',
        value: s?.morale != null ? s.morale + '%' : '--',
        accentColor: 'var(--color-gold)',
      },
    ];
  });
}
