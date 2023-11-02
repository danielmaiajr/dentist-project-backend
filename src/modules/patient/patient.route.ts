import { FastifyInstance, FastifyServerOptions } from "fastify";
import prisma from "../../utils/prisma";

async function routes(fastify: FastifyInstance, options: FastifyServerOptions) {
  fastify.get("/", async (request, reply) => {
    const test = await prisma.patient.findMany();

    reply.send({ test });
  });
}

export default routes;
