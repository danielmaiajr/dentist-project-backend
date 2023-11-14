import { FastifyInstance } from "fastify";

// Import Handlers
import {
  createInsuranceHandler,
  getInsuranceByIdHandler,
  putInsuranceByIdHandler,
} from "./insurance.controller";

// Import Schemas

async function insuranceRoute(fastify: FastifyInstance) {
  // POST /api/insurances
  fastify.post(
    "/",
    { onRequest: [fastify.authenticate] },
    createInsuranceHandler
  );

  // GET /api/insurances
  fastify.get(
    "/:insuranceId",
    { onRequest: [fastify.authenticate] },
    getInsuranceByIdHandler
  );

  // PUT /api/insurances
  fastify.put(
    "/",
    { onRequest: [fastify.authenticate] },
    putInsuranceByIdHandler
  );
}

export default insuranceRoute;
