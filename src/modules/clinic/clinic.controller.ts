import { FastifyReply, FastifyRequest } from "fastify";

// POST /api/clinics
export async function createClinicHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  return reply.send("createClinicHandler");
}

// GET /api/clinics
export async function getClinicByIdHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  return reply.send("getClinicByIdHandler");
}

// PUT /api/clinics/
export async function putClinicByIdHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  return reply.send("putClinicByIdHandler");
}
