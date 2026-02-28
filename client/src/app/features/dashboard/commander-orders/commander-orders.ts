import { Component, output } from '@angular/core';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';

import { ActionBtn } from '@app/shared/components/action-btn/action-btn';
import { FieldsetGroup } from '@app/shared/components/fieldset-group/fieldset-group';

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
}
