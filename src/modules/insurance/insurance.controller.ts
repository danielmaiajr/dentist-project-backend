import { FastifyReply, FastifyRequest } from "fastify";

// POST /api/insurances
export async function createInsuranceHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  return reply.send("createInsuranceHandler");
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
