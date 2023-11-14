import { z } from "zod";

// ----- REQUEST SCHEMA -----
// POST /api/insuranses
export const CreateInsuranceRequestBodySchema = z.object({
  name: z.string({
    required_error: "Nome é Obrigatório",
  }),
});

// GET /api/insuranses/:insuranceId
export const GetInsuranceByIdRequestParamsSchema = z.object({
  insuranceId: z
    .string({
      required_error: "insuranceId é Obrigatório",
    })
    .transform((val) => Number(val)),
});

// PUT /api/insuranses/:insuranceId
export const PutInsuranceRequestBodySchema = z.object({
  name: z.string().optional(),
});

export const PutInsuranceByIdRequestParamsSchema = z.object({
  insuranceId: z
    .string({
      required_error: "insuranceId é Obrigatório",
    })
    .transform((val) => Number(val)),
});
// ----- REPLY SCHEMA -----
// POST /api/insuranses
// GET /api/insuranses
// PUT /api/insuranses

// TYPES
export type CreateInsuranceRequestBodyType = z.infer<
  typeof CreateInsuranceRequestBodySchema
>;

export type GetInsuranceByIdRequestParamsType = z.infer<
  typeof GetInsuranceByIdRequestParamsSchema
>;

export type PutInsuranceRequestBodyType = z.infer<
  typeof PutInsuranceRequestBodySchema
>;

export type PutInsuranceByIdRequestParamsType = z.infer<
  typeof PutInsuranceByIdRequestParamsSchema
>;
