import { Component, computed, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { GameStore } from '@app/features/resources/store/game.store';
import { KnobModule } from 'primeng/knob';
import { ProgressBar } from 'primeng/progressbar';

@Component({
  selector: 'app-game-info-bar',
  imports: [KnobModule, FormsModule, ProgressBar],
  templateUrl: './game-info-bar.html',
  styleUrl: './game-info-bar.scss',
})
export class GameInfoBar {
  private readonly gameStore = inject(GameStore);

  protected readonly day = computed(() => this.gameStore.gameState()?.day ?? '--');
  protected readonly daysRemaining = computed(
    () => this.gameStore.gameState()?.status?.daysRemaining ?? 0,
  );
  protected readonly actionPoints = computed(
    () => this.gameStore.gameState()?.status?.actionPoints ?? 0,
  );
  protected readonly wallHealth = computed(
    () => this.gameStore.gameState()?.status?.wallHealth ?? 0,
  );

  /** Action points as a percentage (max 5 AP) */
  protected readonly actionPointsPct = computed(() => {
    const ap = this.actionPoints();
    return typeof ap === 'number' ? (ap / 5) * 100 : 0;
  });

  protected readonly resourceItems = computed(() => {
    const s = this.gameStore.gameState();
    return [
      {
        label: 'Gold',
        value: s?.resources?.gold ?? '--',
        color: 'var(--color-gold)',
        rate: s?.gold_rate,
      },
      {
        label: 'Wood',
        value: s?.resources?.wood ?? '--',
        color: 'var(--color-wood)',
        rate: s?.wood_rate,
      },
      {
        label: 'Iron',
        value: s?.resources?.iron ?? '--',
        color: 'var(--color-iron)',
        rate: s?.iron_rate,
      },
      { label: 'Stone', value: s?.resources?.stone ?? '--', color: '#8d8d8d', rate: s?.stone_rate },
      {
        label: 'Food',
        value: s?.resources?.food ?? '--',
        color: 'var(--color-blood)',
        rate: s?.food_rate,
      },
      {
        label: 'Swords',
        value: s?.resources?.swords ?? '--',
        color: 'var(--color-iron)',
        rate: undefined,
      },
    ];
  });

  protected readonly militaryItems = computed(() => {
    const s = this.gameStore.gameState();
    return [
      { label: 'Guards', value: s?.military?.guards ?? '--' },
      { label: 'Soldiers', value: s?.military?.soldiers ?? '--' },
      { label: 'Archers', value: s?.military?.archers ?? '--' },
      { label: 'Morale', value: s?.morale != null ? s.morale + '%' : '--' },
    ];
  });
}
