import { z } from "zod";

// ----- REQUEST SCHEMA -----
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
});

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

// PUT /api/users
export const PutUserByIdBodyRequestSchema = z.object({
  name: z.string().optional(),
});

// ----- REPLY SCHEMA -----
// POST /api/users
export const CreateUserReplySchema = z.object({
  id: z.number(),
  email: z.string(),
  role: z.string(),
  clinicId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// GET /api/users
export const GetUserReplySchema = z.object({
  id: z.number(),
  email: z.string(),
  role: z.string(),
  clinicId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// GET /api/users/all
export const GetAllUserReplySchema = z.array(CreateUserReplySchema);

// ----- TYPES -----
export type CreateUserRequestBodyType = z.infer<
  typeof CreateUserRequestBodySchema
>;

export type UserLoginType = z.infer<typeof UserLoginSchema>;

export type PutUserByIdBodyRequestType = z.infer<
  typeof PutUserByIdBodyRequestSchema
>;
