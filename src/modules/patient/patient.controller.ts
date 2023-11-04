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
      const patient = await prisma.patient.create({ data: parsedBody.data });
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
  const parsedBody = PutPatientByIdRequestBodySchema.safeParse(request.body);
  console.log(parsedBody, parsedParams);
  if (parsedBody.success && parsedParams.success) {
    try {
      const patient = await prisma.patient.update({
        where: { id: parsedParams.data.patientId },
        data: parsedBody.data,
      });
      reply.send(patient);
    } catch (err) {
      reply.send(err);
    }
  } else if (!parsedBody.success) reply.send(parsedBody.error);
  else if (!parsedParams.success) reply.send(parsedParams.error);
}

export async function deletePatientByIdHandler(
  request: FastifyRequest<{ Params: GetPatientByIdRequestParamsType }>,
  reply: FastifyReply
) {
  const parsedParams = GetPatientByIdRequestParamsSchema.safeParse(
    request.params
  );

  if (parsedParams.success) {
    try {
      const patient = await prisma.patient.delete({
        where: { id: parsedParams.data.patientId },
      });
      reply.send(patient);
    } catch (err) {
      reply.send(err);
    }
  } else {
    reply.send(parsedParams.error);
  }
}
