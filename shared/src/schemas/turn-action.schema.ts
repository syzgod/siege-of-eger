import z from 'zod';

export const GamePhaseSchema = z.object({
  workGroupId: z.string().uuid(),
  gamePhases: z.enum(['Preparation', 'Siege', 'Defeat', 'Victory']),
});
