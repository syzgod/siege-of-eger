import { Component, computed, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { GameStore } from '@app/features/resources/store/game.store';
import { KnobModule } from 'primeng/knob';

@Component({
  selector: 'app-status-bar',
  standalone: true,
  imports: [KnobModule, FormsModule],
  templateUrl: './status-bar.html',
  styleUrl: './status-bar.scss',
})
export class StatusBar {
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
  protected readonly morale = computed(() => this.gameStore.gameState()?.morale ?? 0);
}
