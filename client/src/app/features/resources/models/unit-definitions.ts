import { GameState } from '@shared/models/game-state.schema';

export interface UnitCost {
  actionPoints: number;
  canAfford: (state: GameState) => boolean;
  apply: (state: GameState) => GameState;
}

interface UnitConfig {
  actionPoints: number;
  costs: Partial<GameState['resources']>;
  rates?: Partial<
    Pick<GameState, 'food_rate' | 'gold_rate' | 'wood_rate' | 'iron_rate' | 'stone_rate'>
  >;
  military?: Partial<GameState['military']>;
}

function defineUnit(config: UnitConfig): UnitCost {
  return {
    actionPoints: config.actionPoints,

    canAfford: (s) => {
      for (const key in config.costs) {
        const k = key as keyof GameState['resources'];
        if (s.resources[k] < config.costs[k]!) return false;
      }
      return true;
    },

    apply: (s) => {
      const resources = { ...s.resources };
      for (const key in config.costs) {
        const k = key as keyof GameState['resources'];
        resources[k] = resources[k] - config.costs[k]!;
      }

      const military = { ...s.military };
      for (const key in config.military) {
        const k = key as keyof GameState['military'];
        military[k] = military[k] + config.military[k]!;
      }

      let state = { ...s, resources, military };
      for (const key in config.rates) {
        const k = key as keyof typeof config.rates;
        (state as any)[k] = (s as any)[k] + config.rates[k]!;
      }

      return state;
    },
  };
}

export const UNIT_DEFINITIONS: Record<string, UnitCost> = {
  guard: defineUnit({
    actionPoints: 1,
    costs: { spears: 1 },
    rates: { food_rate: -1 },
    military: { guards: 1 },
  }),

  soldier: defineUnit({
    actionPoints: 2,
    costs: { spears: 1, iron: 1 },
    rates: { food_rate: -2 },
    military: { soldiers: 1 },
  }),

  archer: defineUnit({
    actionPoints: 1,
    costs: { bows: 2 },
    rates: { food_rate: -1 },
    military: { archers: 1 },
  }),
};
