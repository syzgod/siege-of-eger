import { z } from "zod";

// Shared validation schema used by both frontend and backend.
export const GameStateSchema = z.object({
  day: z.number().int().min(1),
  wood: z.number().min(0),
  iron: z.number().min(0),
  food: z.number().min(0),
  morale: z.number().min(0).max(100),
  updated_at: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
    return arg;
  }, z.date()),
  gold_rate: z.number().min(0),
  wood_rate: z.number().min(0),
});

export type GameState = z.infer<typeof GameStateSchema>;
