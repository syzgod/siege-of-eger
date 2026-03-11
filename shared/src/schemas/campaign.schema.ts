import { z } from 'zod';

// Shared validation schema used by both frontend and backend.
export const RawCampaignSchema = z.object({
  id: z.string().uuid(),
  owner_id: z.string().uuid(),
  name: z.string().default('Eger 1552'),
  scenario_key: z.string().default('eger_1552'),
  phase: z.enum(['prep', 'siege', 'won', 'lost']).default('prep'),
  day: z.number().int().min(1).default(1),
  morale: z.number().int().min(0).max(100).default(100),
  days_remaining: z.number().int().min(0).max(31).default(30),
  action_points: z.number().int().min(0).default(5),
  wall_integrity: z.number().int().min(0).max(100).default(100),
  defense_power: z.number().int().min(0).default(1000),
  total_population: z.number().int().min(0).default(2100),
  food_consumption_per_person: z.number().int().min(0).default(1),
  updated_at: z.string(),
});

export const CampaignSchema = RawCampaignSchema.transform((db) => ({
  id: db.id,
  ownerId: db.owner_id,
  name: db.name,
  scenarioKey: db.scenario_key,
  day: db.day,
  phase: db.phase,
  morale: db.morale,
  updatedAt: new Date(db.updated_at),
  status: {
    daysRemaining: db.days_remaining,
    actionPoints: db.action_points,
    wallIntegrity: db.wall_integrity,
    defensePower: db.defense_power,
    totalPopulation: db.total_population,
    foodConsumptionPerPerson: db.food_consumption_per_person,
  },
}));

export type Campaign = z.infer<typeof CampaignSchema>;

export function createBaseCampaign(
  ownerId: string,
  campaignId: string,
): Campaign {
  return {
    id: campaignId,
    ownerId: ownerId,
    name: 'Eger 1552',
    scenarioKey: 'eger_1552',
    day: 1,
    phase: 'prep',
    morale: 100,
    updatedAt: new Date(),
    status: {
      daysRemaining: 30,
      actionPoints: 5,
      wallIntegrity: 100,
      defensePower: 1000,
      totalPopulation: 2100,
      foodConsumptionPerPerson: 1,
    },
  };
}
