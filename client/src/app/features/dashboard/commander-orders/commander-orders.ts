import { Component, inject, output } from '@angular/core';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';

import { ActionBtn } from '@app/shared/components/action-btn/action-btn';
import { FieldsetGroup } from '@app/shared/components/fieldset-group/fieldset-group';
import { GameStore } from '@app/features/resources/store/game.store';

@Component({
  selector: 'app-commander-orders',
  standalone: true,
  imports: [Tabs, TabList, Tab, TabPanels, TabPanel, FieldsetGroup, ActionBtn],
  templateUrl: './commander-orders.html',
  styleUrl: './commander-orders.scss',
})
export class CommanderOrders {
  readonly advanceDay = output<void>();
  readonly build = output<string>();
  readonly craft = output<string>();
  readonly train = output<string>();
  readonly repair = output<string>();

  protected readonly gameStore = inject(GameStore);

  getGuardDisabledReason(): string {
    const state = this.gameStore.gameState();
    const reasons: string[] = [];

    if ((state?.status?.actionPoints ?? 0) < 1) {
      reasons.push('Not enough action points (need 1)');
    }
    if ((state?.resources?.spears ?? 0) < 1) {
      reasons.push('Not enough spears (need 1)');
    }
    if ((state?.population?.peasants ?? 0) < 1) {
      reasons.push('No peasants available to train');
    }

    return reasons.join('; ');
  }
}
