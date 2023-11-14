import { z } from "zod";

// ----- REQUEST SCHEMA -----
// POST /api/clinics
export const CreateClinicResquestBodySchema = z.object({
  email: z
    .string({
      required_error: "Email é Obrigatório",
    })
    .email(),
  password: z.string({
    required_error: "Senha é Obrigatória",
  }),
  name: z.string().optional(),
  cpnj: z.string().optional(),
  responsible: z.string().optional(),
  phone: z.string().optional(),
  celphone: z.string().optional(),
  cep: z.string().optional(),
  street: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
});

// GET /api/clinics

// PUT /api/clinics
export const PutClinicRequestBodySchema = z.object({
  name: z.string().optional(),
  cpnj: z.string().optional(),
  responsible: z.string().optional(),
  phone: z.string().optional(),
  celphone: z.string().optional(),
  cep: z.string().optional(),
  street: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
});

//TYPES
export type CreateClinicRequestType = z.infer<
  typeof CreateClinicResquestBodySchema
>;

export type PutClinicRequestBodyType = z.infer<
  typeof PutClinicRequestBodySchema
>;

// ----- REPLY SCHEMA -----
// POST /api/clinics
// GET /api/clinics
// PUT /api/clinics
