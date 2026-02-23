import { GameStateSchema, type GameState } from '@shared/models/game-state.schema';

export { GameStateSchema, type GameState };

export const INITIAL_GAME_STATE: GameState = {
  day: 1,
  wood: 500,
  iron: 200,
  food: 1000,
  morale: 100,
};
