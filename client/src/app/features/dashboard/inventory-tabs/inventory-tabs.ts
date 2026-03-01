import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';

import { Component } from '@angular/core';
import { ConsumptionPanel } from '../consumption-panel/consumption-panel';
import { PopulationPanel } from '../population-panel/population-panel';
import { ResourcePanel } from '../resource-panel/resource-panel';
import { TroopsPanel } from '../troops-panel/troops-panel';

@Component({
  selector: 'app-inventory-tabs',
  standalone: true,
  imports: [
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    ResourcePanel,
    TroopsPanel,
    ConsumptionPanel,
    PopulationPanel,
  ],
  templateUrl: './inventory-tabs.html',
  styleUrl: './inventory-tabs.scss',
})
export class InventoryTabs {}
