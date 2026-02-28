import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';

import { Component } from '@angular/core';
import { ConsumptionPanel } from '../consumption-panel/consumption-panel';
import { ResourcePanel } from '../resource-panel/resource-panel';
import { TroopsPanel } from '../troops-panel/troops-panel';

@Component({
  selector: 'app-inventory-tabs',
  standalone: true,
  imports: [Tabs, TabList, Tab, TabPanels, TabPanel, ResourcePanel, TroopsPanel, ConsumptionPanel],
  template: `
    <section class="medieval-card" aria-label="Fortress inventory">
      <p-tabs [value]="0">
        <p-tablist>
          <p-tab [value]="0">🪙 Resources</p-tab>
          <p-tab [value]="1">⚔️ Troops</p-tab>
          <p-tab [value]="2">📦 Consumption</p-tab>
        </p-tablist>

        <p-tabpanels>
          <p-tabpanel [value]="0">
            <div class="pt-4">
              <app-resource-panel />
            </div>
          </p-tabpanel>

          <p-tabpanel [value]="1">
            <div class="pt-4">
              <app-troops-panel />
            </div>
          </p-tabpanel>

          <p-tabpanel [value]="2">
            <div class="pt-4">
              <app-consumption-panel />
            </div>
          </p-tabpanel>
        </p-tabpanels>
      </p-tabs>
    </section>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }
  `,
})
export class InventoryTabs {}
