import { FastifyInstance, FastifyServerOptions } from "fastify";
import patientController from "./patient.controller";

async function routes(fastify: FastifyInstance, options: FastifyServerOptions) {
  fastify.get("/", patientController);
}

export default routes;
