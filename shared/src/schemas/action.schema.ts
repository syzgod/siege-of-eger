import z from 'zod';

export const WorkerActionEnum = z.enum([
  'GATHERING',
  'COOKING',
  'REPAIRING',
  'RESTING',
]);
export type WorkerAction = z.infer<typeof WorkerActionEnum>;

export const AssignWorkerSchema = z.object({
  workerId: z.string().uuid(),
  action: WorkerActionEnum,
});

export type AssignWorkerDTO = z.infer<typeof AssignWorkerSchema>;
