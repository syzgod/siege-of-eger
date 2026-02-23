import { z } from 'zod';

export const GameStateSchema = z.object({
  day: z.number().int().min(1),
  wood: z.number().min(0),
  iron: z.number().min(0),
  food: z.number().min(0),
  morale: z.number().min(0).max(100),
});

export type GameState = z.infer<typeof GameStateSchema>;

export const INITIAL_GAME_STATE: GameState = {
  day: 1,
  wood: 500,
  iron: 200,
  food: 1000,
  morale: 100,
};
