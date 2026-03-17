import z from 'zod';

export const GamePhaseEnum = z.enum([
  'PREPARATION',
  'SIEGE',
  'DEFEAT',
  'VICTORY',
]);
export type GamePhaseDTO = z.infer<typeof GamePhaseEnum>;
