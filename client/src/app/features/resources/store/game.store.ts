import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';

import { GameApiService } from '../../../core/services/game-api.service';
import { GameState } from '@shared/models/game-state.schema';
import { UNIT_DEFINITIONS } from '../models/unit-definitions';
import { effect } from '@angular/core';
import { inject } from '@angular/core';

export const GameStore = signalStore(
  { providedIn: 'root' },
  withState({
    gameState: null as GameState | null,
  }),
  withMethods((store) => ({
    spendResources(gold: number, wood: number) {
      const current = store.gameState();
      if (!current) return;

      patchState(store, {
        gameState: {
          ...current,
          resources: {
            ...current.resources,
            gold: current.resources.gold - gold,
            wood: current.resources.wood - wood,
          },
        },
      });
    },
    advanceDay() {
      const current = store.gameState();
      if (!current) return;
      patchState(store, {
        gameState: {
          ...current,
          day: current.day + 1,
          status: {
            ...current.status,
            daysRemaining: Math.max(0, current.status.daysRemaining - 1),
            actionPoints: current.status.actionPoints + 5,
          },
          resources: {
            ...current.resources,
            gold: current.resources.gold + current.gold_rate,
            wood: current.resources.wood + current.wood_rate,
            iron: current.resources.iron + current.iron_rate,
            stone: current.resources.stone + current.stone_rate,
            food: current.resources.food + current.food_rate,
          },
        },
      });
    },
    trainUnit(unitType: string): boolean {
      const current = store.gameState();
      const def = UNIT_DEFINITIONS[unitType];

      if (!current || !def || current.population.peasants < 1) {
        console.warn('No peasants left to train!');
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
            peasants: updatedByDef.population.peasants - 1,
          },
          status: {
            ...updatedByDef.status,
            actionPoints: updatedByDef.status.actionPoints - def.actionPoints,
          },
        },
      });

      return true;
    },
    trainGuard(): boolean {
      return this.trainUnit('guard');
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
