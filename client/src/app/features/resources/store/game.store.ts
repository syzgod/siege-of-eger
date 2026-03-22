import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';

import { Campaign } from '@shared/schemas/campaign.schema';
import { GameApiService } from '../../../core/services/game-api.service';
// import { UNIT_DEFINITIONS } from '../models/unit-definitions';
import { effect } from '@angular/core';
import { inject } from '@angular/core';

export const GameStore = signalStore(
  { providedIn: 'root' },
  withState({
    gameState: null as Campaign | null,
  }),
  withMethods((store) => ({
    advanceDay() {
      const current = store.gameState();
      if (!current) return;
      patchState(store, {
        gameState: {
          ...current,
          day: current.day + 1,
          morale: current.morale - 1,
          status: {
            ...current.status,
            daysRemaining: Math.max(0, current.status.daysRemaining - 1),
            actionPoints: current.status.actionPoints + 5,
            wallIntegrity: current.status.wallIntegrity - 1,
          },
        },
      });
    },
    trainUnits(unitType: string, quantity: number = 1): boolean {
      const current = store.gameState();
      // const def = UNIT_DEFINITIONS[unitType];

      if (!current || current.status.totalPopulation < quantity) {
        console.warn("Can't train that many peasant!");
        return false;
      }

      // Check resource costs and action points
      if (!def.canAfford(current) || current.status.actionPoints < def.actionPoints) {
        console.warn('Cannot afford a guard (Check AP or Spears)!');
        return false;
      }

      // Apply costs and deduct AP
      const updatedByDef = def.apply(current);
      patchState(store, {
        gameState: {
          ...updatedByDef,
          population: {
            ...updatedByDef.population,
            volunteers: updatedByDef.population.volunteers - 1,
          },
          status: {
            ...updatedByDef.status,
            actionPoints: updatedByDef.status.actionPoints - def.actionPoints,
          },
        },
      });

      return true;
    },
    trainUnit(unit: string): boolean {
      return this.trainUnits(unit);
    },
  })),
  withHooks({
    onInit(store, api = inject(GameApiService)) {
      effect(() => {
        const data = api.gameState.value();
        if (data) {
          patchState(store, { gameState: data });
        }
      });
    },
  }),
);

//TODO Create batch training, 1 training 50 units, reflect in UI, determine the Ottoman army power so we can match with the defense
