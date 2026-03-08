import z from 'zod';

export const SoldierBlueprintSchema = z.object({
  id: z.number().int(),
  label: z.string(),
  basePower: z.number().int(),
});

export const ActiveTroopSchema = z.object({
  id: z.number(),
  campaignId: z.string().uuid(),
  headcount: z.number().int(),
  experience: z.number().int(),
});

export const HydratedTroopDto = ActiveTroopSchema.extend({
  blueprint: SoldierBlueprintSchema.nullable(),
});

export type HydratedTroop = z.infer<typeof HydratedTroopDto>;
