export interface Skill {
  id: string;
  name: string;
  bonus: number; // Flat bonus to GDP
  multiplier: number; // Percent bonus (e.g., 1.1 for 10% boost)
  description: string;
}
