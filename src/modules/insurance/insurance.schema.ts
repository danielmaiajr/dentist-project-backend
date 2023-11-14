import { z } from "zod";

// ----- REQUEST SCHEMA -----
// POST /api/insuranses
export const CreateInsuranceRequestBodySchema = z.object({
  name: z.string({
    required_error: "Nome é Obrigatório",
  }),
});

// GET /api/insuranses
// PUT /api/insuranses
export const PutInsuranceRequestBodySchema = z.object({
  name: z.string().optional(),
});

// ----- REPLY SCHEMA -----
// POST /api/insuranses
// GET /api/insuranses
// PUT /api/insuranses

// TYPES
export type CreateInsuranceRequestBodyType = z.infer<
  typeof CreateInsuranceRequestBodySchema
>;

export type PutInsuranceRequestBodyType = z.infer<
  typeof PutInsuranceRequestBodySchema
>;
