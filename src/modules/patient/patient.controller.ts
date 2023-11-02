import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../utils/prisma";

const patientController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const test = await prisma.patient.findMany();

  reply.send({ test });
};

export default patientController;
