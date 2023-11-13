import { z } from "zod";

// REQUEST Schema
// POST /api/users
export const CreateUserRequestBodySchema = z.object({
  email: z
    .string({
      required_error: "Email é Obrigatório",
    })
    .email(),
  password: z.string({
    required_error: "Senha é Obrigatória",
  }),
  clinicId: z.number({
    required_error: "ClinicId é Obrigatório",
  }),
});

// REPLY Schema
// POST /api/users
export const CreateUserReplySchema = z.object({
  id: z.number(),
  email: z.string(),
  role: z.string(),
  clinicId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// REQUEST Schema
// POST /api/users/login
export const UserLoginSchema = z.object({
  email: z
    .string({
      required_error: "Email é Obrigatório",
    })
    .email(),
  password: z.string({
    required_error: "Senha é Obrigatória",
  }),
});

// TYPES
export type CreateUserRequestBodyType = z.infer<
  typeof CreateUserRequestBodySchema
>;

export type UserLoginType = z.infer<typeof UserLoginSchema>;
