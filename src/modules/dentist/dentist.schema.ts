import { z } from "zod";

// REQUEST Schema
// POST /api/dentists
export const CreateDentistRequestBodySchema = z.object({
  name: z.string({
    required_error: "Nome é Obrigatório",
  }),
});

// REQUEST Schema
// GET /api/dentists/:dentistId
export const GetDentistByIdRequestParamsSchema = z.object({
  dentistId: z
    .string({
      required_error: "dentistId é Obrigatório",
    })
    .transform((val) => Number(val)),
});

// REQUEST Schema
// PUT /api/dentists/:dentistId
export const PutDentistByIdRequestBodySchema = z.object(
  {
    name: z.string().optional(),
  },
  { required_error: "Precisa de pelo menos um campo" }
);

// TYPES
export type CreateDentistRequestBodyType = z.infer<
  typeof CreateDentistRequestBodySchema
>;

export type GetDentistByIdRequestParamsType = z.infer<
  typeof GetDentistByIdRequestParamsSchema
>;

export type PutDentistByIdRequestBodyType = z.infer<
  typeof PutDentistByIdRequestBodySchema
>;
