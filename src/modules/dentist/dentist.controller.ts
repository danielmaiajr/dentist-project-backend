import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../utils/prisma";
import {
  CreateDentistRequestBodySchema,
  CreateDentistRequestBodyType,
  GetDentistByIdRequestParamsSchema,
  GetDentistByIdRequestParamsType,
  PutDentistByIdRequestBodySchema,
  PutDentistByIdRequestBodyType,
} from "./dentist.schema";

export async function createDentistHandler(
  request: FastifyRequest<{ Body: CreateDentistRequestBodyType }>,
  reply: FastifyReply
) {
  const parsedBody = CreateDentistRequestBodySchema.safeParse(request.body);

  if (!parsedBody.success) return reply.send(parsedBody.error);
  try {
    const dentist = await prisma.dentist.create({
      data: { ...parsedBody.data, userId: request.user.id },
    });

    reply.send(dentist);
  } catch (err) {
    reply.send(err);
  }
}

export async function getDentistByIdHandler(
  request: FastifyRequest<{ Params: GetDentistByIdRequestParamsType }>,
  reply: FastifyReply
) {
  const parsedParams = GetDentistByIdRequestParamsSchema.safeParse(
    request.params
  );

  if (!parsedParams.success) return reply.send(parsedParams.error);
  try {
    const dentist = await prisma.dentist.findUnique({
      where: { id: parsedParams.data.dentistId },
    });

    reply.send(dentist);
  } catch (err) {
    reply.send(err);
  }
}

export async function getAllDentistsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const dentist = await prisma.dentist.findMany();

    reply.send(dentist);
  } catch (err) {
    reply.send(err);
  }
}

export async function updateDentistByIdHandler(
  request: FastifyRequest<{
    Params: GetDentistByIdRequestParamsType;
    Body: PutDentistByIdRequestBodyType;
  }>,
  reply: FastifyReply
) {
  const parsedParams = GetDentistByIdRequestParamsSchema.safeParse(
    request.params
  );
  if (!parsedParams.success) return reply.send(parsedParams.error);

  const parsedBody = PutDentistByIdRequestBodySchema.safeParse(request.body);
  if (!parsedBody.success) return reply.send(parsedBody.error);

  try {
    const dentist = await prisma.dentist.update({
      where: { id: parsedParams.data.dentistId },
      data: parsedBody.data,
    });

    reply.send(dentist);
  } catch (err) {
    reply.send(err);
  }
}
