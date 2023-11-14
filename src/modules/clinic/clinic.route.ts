import { FastifyInstance } from "fastify";

// Import Handlers
import {
  createClinicHandler,
  getClinicByIdHandler,
  putClinicByIdHandler,
} from "./clinic.controller";

// Import Schemas

async function clinicRoute(fastify: FastifyInstance) {
  // POST /api/clinics
  fastify.post("/", createClinicHandler);

  // GET /api/clinics
  fastify.get("/", { onRequest: [fastify.authenticate] }, getClinicByIdHandler);

  // PUT /api/clinics
  fastify.put("/", { onRequest: [fastify.authenticate] }, putClinicByIdHandler);
}

export default clinicRoute;
