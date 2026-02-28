import { z } from 'zod';

// Shared validation schema used by both frontend and backend.
export const RawGameStateSchema = z.object({
  days_remaining: z.number().default(30),
  action_points: z.number().default(5),
  wall_health: z.number().default(100),
  gold: z.number().min(0),
  wood: z.number().min(0),
  iron: z.number().min(0),
  stone: z.number().min(0),
  food: z.number().min(0),
  swords: z.number().min(0).default(0),
  spears: z.number().min(0).default(1),
  bows: z.number().min(0).default(0),
  guards: z.number().min(0).default(0),
  soldiers: z.number().min(0).default(0),
  archers: z.number().min(0).default(0),
  day: z.number().int().min(1),
  morale: z.number().min(0).max(100),
  updated_at: z.string(),
  gold_rate: z.number().min(0),
  wood_rate: z.number().min(0),
  iron_rate: z.number().min(0),
  stone_rate: z.number().min(0),
  food_rate: z.number().min(0),
});

export const GameStateSchema = RawGameStateSchema.transform((db) => ({
  status: {
    daysRemaining: db.days_remaining,
    actionPoints: db.action_points,
    wallHealth: db.wall_health,
  },
  resources: {
    gold: db.gold,
    wood: db.wood,
    iron: db.iron,
    stone: db.stone,
    food: db.food,
    swords: db.swords,
    spears: db.spears,
    bows: db.bows,
  },
  military: {
    guards: db.guards,
    soldiers: db.soldiers,
    archers: db.archers,
  },
  day: db.day,
  morale: db.morale,
  updated_at: new Date(db.updated_at),
  gold_rate: db.gold_rate,
  wood_rate: db.wood_rate,
  iron_rate: db.iron_rate,
  stone_rate: db.stone_rate,
  food_rate: db.food_rate,
}));

export type GameState = z.infer<typeof GameStateSchema>;
