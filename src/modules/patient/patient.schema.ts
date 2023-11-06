import { z } from "zod";

// REQUEST Schema
// POST /api/patients
export const CreatePatientRequestBodySchema = z.object({
  name: z.string({
    required_error: "Nome é Obrigatório",
  }),
});

// REQUEST Schema
// GET /api/patients/:patientId
export const GetPatientByIdRequestParamsSchema = z.object({
  patientId: z
    .string({
      required_error: "PatientId é Obrigatório",
    })
    .transform((val) => Number(val)),
});

// REQUEST Schema
// PUT /api/patients/:patientId
export const PutPatientByIdRequestBodySchema = z.object({
  name: z.string().optional(),
});

// TYPES
export type CreatePatientRequestBodyType = z.infer<
  typeof CreatePatientRequestBodySchema
>;

export type GetPatientByIdRequestParamsType = z.infer<
  typeof GetPatientByIdRequestParamsSchema
>;

export type PutPatientByIdRequestBodyType = z.infer<
  typeof PutPatientByIdRequestBodySchema
>;
