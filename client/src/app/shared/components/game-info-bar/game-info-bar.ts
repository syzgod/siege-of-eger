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
    () => this.gameStore.gameState()?.status?.wallIntegrity ?? 0,
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
        label: '🪙 Gold',
        value: '--',
        color: 'var(--color-gold)',
        rate: 1,
      },
      {
        label: '🪵 Wood',
        value: '--',
        color: 'var(--color-wood)',
        rate: 1,
      },
      {
        label: '⛏️ Iron',
        value: '--',
        color: 'var(--color-iron)',
        rate: 1,
      },
      {
        label: '🪨 Stone',
        value: '--',
        color: '#8d8d8d',
        rate: 1,
      },
      {
        label: '🍖 Food',
        value: '--',
        color: 'var(--color-blood)',
        rate: 1,
      },
      {
        label: '⚔️ Swords',
        value: '--',
        color: 'var(--color-iron)',
        rate: undefined,
      },
    ];
  });

  protected readonly militaryItems = computed(() => {
    const s = this.gameStore.gameState();
    return [
      { label: '🛡️ Hussars', value: '--' },
      { label: '⚔️ Soldiers', value: '--' },
      { label: '🏹 Archers', value: '--' },
      { label: '🔥 Morale', value: s?.morale != null ? s.morale + '%' : '--' },
    ];
  });
}
