import { z } from "zod";

// ----- REQUEST SCHEMA -----
// POST /api/appointment
export const CreateAppointmentRequestBodySchema = z.object({
  patientId: z.number(),
  userId: z.number(),
  insuranceId: z.number(),
});

// GET /api/appointment/:appointmentId
export const GetAppointmentByIdRequestParamsSchema = z.object({
  appointmentId: z.string().transform((val) => Number(val)),
});

// PUT /api/appointment/:appointmentId
export const PutAppointmentByIdRequestParamsSchema = z.object({
  appointmentId: z.string().transform((val) => Number(val)),
});

export const PutAppointmentByIdRequestBodySchema = z.object({
  patientId: z
    .string()
    .transform((val) => Number(val))
    .optional(),
  userId: z
    .string()
    .transform((val) => Number(val))
    .optional(),
  insuranceId: z
    .string()
    .transform((val) => Number(val))
    .optional(),
});

// TYPES
export type CreateAppointmentRequestBodyType = z.infer<
  typeof CreateAppointmentRequestBodySchema
>;

export type GetAppointmentByIdRequestParamsType = z.infer<
  typeof GetAppointmentByIdRequestParamsSchema
>;

export type PutAppointmentByIdRequestParamsType = z.infer<
  typeof PutAppointmentByIdRequestParamsSchema
>;

export type PutAppointmentByIdRequestBodyType = z.infer<
  typeof PutAppointmentByIdRequestBodySchema
>;
