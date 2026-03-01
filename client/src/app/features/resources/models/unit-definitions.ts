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
  const { actionPoints, costs = {}, military = {}, rates = {} } = config;
  return {
    actionPoints: config.actionPoints,

    // Can we afford it?
    canAfford: (s: GameState) => {
      // Loop through each cost defined in the config
      // Object.keys gives us ['gold', 'wood', etc.]
      for (const resource of Object.keys(costs) as Array<keyof GameState['resources']>) {
        const costAmount = costs[resource] ?? 0;
        if (s.resources[resource] < costAmount) {
          return false; // Stop immediately if we can't afford one item
        }
      }
      return true;
    },

    // Apply the changes
    apply: (s: GameState) => {
      // Create shallow copies of the nested objects to keep it "Immutable"
      const resources = { ...s.resources };
      const currentMilitary = { ...s.military };
      const updatedState = { ...s };

      // Subtract Costs
      for (const res of Object.keys(costs) as Array<keyof GameState['resources']>) {
        resources[res] -= costs[res] ?? 0;
      }

      // Add Military Units
      for (const unit of Object.keys(military) as Array<keyof GameState['military']>) {
        currentMilitary[unit] += military[unit] ?? 0;
      }

      // Update Rates (Root level)
      for (const rate of Object.keys(rates) as Array<keyof typeof rates>) {
        // We use brackets to update the specific rate like state['gold_rate']
        const rateKey = rate as keyof GameState;
        if (typeof updatedState[rateKey] === 'number') {
          (updatedState[rateKey] as number) += rates[rate] ?? 0;
        }
      }

      // Return the final merged state
      return {
        ...updatedState,
        resources,
        military: currentMilitary,
      };
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
