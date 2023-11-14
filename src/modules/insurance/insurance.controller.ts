import { FastifyReply, FastifyRequest } from "fastify";
import {
  CreateInsuranceRequestBodySchema,
  GetInsuranceByIdRequestParamsSchema,
  GetInsuranceByIdRequestParamsType,
  PutInsuranceByIdRequestParamsSchema,
  PutInsuranceByIdRequestParamsType,
  PutInsuranceRequestBodySchema,
  PutInsuranceRequestBodyType,
} from "./insurance.schema";
import prisma from "../../utils/prisma";

// POST /api/insurances
export async function createInsuranceHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const parsedBody = CreateInsuranceRequestBodySchema.safeParse(request.body);
  if (!parsedBody.success) return reply.code(500).send(parsedBody.error);

  try {
    const insurance = await prisma.insurance.create({
      data: {
        ...parsedBody.data,
        clinicId: request.user.clinicId,
      },
    });

    return reply.send(insurance);
  } catch (err) {
    return reply.code(500).send({ errorMessage: "database Error", err });
  }
}

// GET /api/insurances/:insuranceId
export async function getInsuranceByIdHandler(
  request: FastifyRequest<{ Params: GetInsuranceByIdRequestParamsType }>,
  reply: FastifyReply
) {
  const parsedParams = GetInsuranceByIdRequestParamsSchema.safeParse(
    request.params
  );
  if (!parsedParams.success) return reply.code(500).send(parsedParams.error);

  try {
    const insurance = await prisma.insurance.findFirst({
      where: { id: parsedParams.data.insuranceId },
    });

    return reply.send(insurance);
  } catch (err) {
    return reply.code(500).send({ errorMessage: "database Error", err });
  }
}

// PUT /api/insurances/:insuranceId
export async function putInsuranceByIdHandler(
  request: FastifyRequest<{
    Params: PutInsuranceByIdRequestParamsType;
    Body: PutInsuranceRequestBodyType;
  }>,
  reply: FastifyReply
) {
  const parsedParams = PutInsuranceByIdRequestParamsSchema.safeParse(
    request.params
  );
  if (!parsedParams.success) return reply.code(500).send(parsedParams.error);

  const parsedBody = PutInsuranceRequestBodySchema.safeParse(request.body);
  if (!parsedBody.success) return reply.code(500).send(parsedBody.error);

  try {
    const insurance = await prisma.insurance.update({
      where: { id: parsedParams.data.insuranceId },
      data: parsedBody.data,
    });

    return reply.send(insurance);
  } catch (err) {
    return reply.code(500).send({ errorMessage: "database Error", err });
  }
}
