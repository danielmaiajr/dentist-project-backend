import { z } from "zod";

export const CreateAppointmentRequestBodySchema = z.object({
  patientId: z.number(),
  dentistId: z.number(),
});

export const GetAppointmentByIdRequestParamsSchema = z.object({
  appointmentId: z.string().transform((val) => Number(val)),
});

export const PutAppointmentByIdRequestBodySchema = z.object({
  patientId: z
    .string()
    .transform((val) => Number(val))
    .optional(),
  dentistId: z
    .string()
    .transform((val) => Number(val))
    .optional(),
});

export type CreateAppointmentRequestBodyType = z.infer<
  typeof CreateAppointmentRequestBodySchema
>;

export type GetAppointmentByIdRequestParamsType = z.infer<
  typeof GetAppointmentByIdRequestParamsSchema
>;

export type PutAppointmentByIdRequestBodyType = z.infer<
  typeof PutAppointmentByIdRequestBodySchema
>;
