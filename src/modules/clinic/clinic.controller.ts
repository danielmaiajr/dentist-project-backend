import { FastifyReply, FastifyRequest } from "fastify";
import {
  CreateClinicRequestType,
  CreateClinicResquestBodySchema,
} from "./clinic.schema";
import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";

// POST /api/clinics
export async function createClinicHandler(
  request: FastifyRequest<{ Body: CreateClinicRequestType }>,
  reply: FastifyReply
) {
  const parsedBody = CreateClinicResquestBodySchema.safeParse(request.body);
  if (!parsedBody.success) return reply.send(parsedBody.error);

  try {
    const hash = await hashPassword(parsedBody.data.password);
    const clinic = await prisma.clinic.create({
      data: {
        User: {
          create: [
            {
              email: parsedBody.data.email,
              password_hash: hash,
              role: "Admin",
            },
          ],
        },
      },
    });

    reply.send(clinic);
  } catch (err) {
    reply.send(err);
  }
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
