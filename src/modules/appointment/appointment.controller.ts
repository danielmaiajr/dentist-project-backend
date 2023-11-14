import { FastifyReply, FastifyRequest } from "fastify";

import {
  CreateAppointmentRequestBodySchema,
  CreateAppointmentRequestBodyType,
  GetAppointmentByIdRequestParamsSchema,
  GetAppointmentByIdRequestParamsType,
  PutAppointmentByIdRequestBodySchema,
  PutAppointmentByIdRequestBodyType,
} from "./appointment.schema";

import prisma from "../../utils/prisma";

// ROUTE POST /api/appointments
export async function createAppointmentHandler(
  request: FastifyRequest<{ Body: CreateAppointmentRequestBodyType }>,
  reply: FastifyReply
) {
  const parsedBody = CreateAppointmentRequestBodySchema.safeParse(request.body);
  if (!parsedBody.success) return reply.code(500).send(parsedBody.error);

  try {
    const appointment = await prisma.appointment.create({
      data: {
        ...parsedBody.data,
        status: "Avaliação",
        clinicId: request.user.clinicId,
      },
    });

    reply.send(appointment);
  } catch (err) {
    return reply.code(500).send({ errorMessage: "database Error", err });
  }
}

// ROUTE GET /api/appointments
export async function getAllAppointmentsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const appointment = await prisma.appointment.findMany({
      where: { clinicId: request.user.clinicId },
    });
    reply.send(appointment);
  } catch (err) {
    return reply.code(500).send({ errorMessage: "database Error", err });
  }
}

export async function getAppointmentByIdHandler(
  request: FastifyRequest<{ Params: GetAppointmentByIdRequestParamsType }>,
  reply: FastifyReply
) {
  const parsedParams = GetAppointmentByIdRequestParamsSchema.safeParse(
    request.params
  );

  if (!parsedParams.success) return reply.code(500).send(parsedParams.error);

  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: parsedParams.data.appointmentId },
    });

    reply.send(appointment);
  } catch (err) {
    return reply.code(500).send({ errorMessage: "database Error", err });
  }
}

export async function updateAppointmentByIdHandler(
  request: FastifyRequest<{
    Params: GetAppointmentByIdRequestParamsType;
    Body: PutAppointmentByIdRequestBodyType;
  }>,
  reply: FastifyReply
) {
  const parsedParams = GetAppointmentByIdRequestParamsSchema.safeParse(
    request.params
  );
  if (!parsedParams.success) return reply.send(parsedParams.error);

  const parsedBody = PutAppointmentByIdRequestBodySchema.safeParse(
    request.body
  );
  if (!parsedBody.success) return reply.send(parsedBody.error);

  console.log(parsedBody.data);
  try {
    const appointment = await prisma.appointment.update({
      where: { id: parsedParams.data.appointmentId },
      data: parsedBody.data,
    });

    reply.send(appointment);
  } catch (err) {
    reply.send(err);
  }
}
