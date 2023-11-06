import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../utils/prisma";
import {
  CreatePatientRequestBodySchema,
  GetPatientByIdRequestParamsSchema,
  PutPatientByIdRequestBodySchema,
  CreatePatientRequestBodyType,
  GetPatientByIdRequestParamsType,
  PutPatientByIdRequestBodyType,
} from "./patient.schema";

export async function createPatientHandler(
  request: FastifyRequest<{ Body: CreatePatientRequestBodyType }>,
  reply: FastifyReply
) {
  const parsedBody = CreatePatientRequestBodySchema.safeParse(request.body);

  if (parsedBody.success) {
    try {
      const patient = await prisma.patient.create({
        data: { ...parsedBody.data, userId: Number(request.user.id) },
      });

      reply.send(patient);
    } catch (err) {
      reply.send(err);
    }
  } else {
    reply.code(500).send(parsedBody.error);
  }
}

export async function getAllPatientsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const patient = await prisma.patient.findMany();

  reply.send(patient);
}

export async function getPatientByIdHandler(
  request: FastifyRequest<{ Params: GetPatientByIdRequestParamsType }>,
  reply: FastifyReply
) {
  const parsedParams = GetPatientByIdRequestParamsSchema.safeParse(
    request.params
  );

  if (parsedParams.success) {
    try {
      const patient = await prisma.patient.findUnique({
        where: { id: parsedParams.data.patientId },
      });

      reply.send(patient);
    } catch (err) {
      reply.send(err);
    }
  } else {
    reply.code(500).send(parsedParams.error);
  }
}

export async function updatePatientByIdHandler(
  request: FastifyRequest<{
    Params: GetPatientByIdRequestParamsType;
    Body: PutPatientByIdRequestBodyType;
  }>,
  reply: FastifyReply
) {
  const parsedParams = GetPatientByIdRequestParamsSchema.safeParse(
    request.params
  );
  if (!parsedParams.success) return reply.send(parsedParams.error);

  const parsedBody = PutPatientByIdRequestBodySchema.safeParse(request.body);
  if (!parsedBody.success) return reply.send(parsedBody.error);

  try {
    const patient = await prisma.patient.update({
      where: { id: parsedParams.data.patientId },
      data: parsedBody.data,
    });

    reply.send(patient);
  } catch (err) {
    reply.send(err);
  }
}
