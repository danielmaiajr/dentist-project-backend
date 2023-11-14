import { FastifyReply, FastifyRequest } from "fastify";
import { CreateInsuranceRequestBodySchema } from "./insurance.schema";
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

// GET /api/insurances
export async function getInsuranceByIdHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  return reply.send("getInsuranceByIdHandler");
}

// PUT /api/insurances
export async function putInsuranceByIdHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  return reply.send("putInsuranceByIdHandler");
}
