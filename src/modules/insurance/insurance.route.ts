import { FastifyInstance } from "fastify";

// Import Handlers
import {
  createInsuranceHandler,
  getAllInsuracesHandler,
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
    "/",
    { onRequest: [fastify.authenticate] },
    getAllInsuracesHandler
  );

  // GET /api/insurances/:insuranceId
  fastify.get(
    "/:insuranceId",
    { onRequest: [fastify.authenticate] },
    getInsuranceByIdHandler
  );

  // PUT /api/insurances/:insuranceId
  fastify.put(
    "/:insuranceId",
    { onRequest: [fastify.authenticate] },
    putInsuranceByIdHandler
  );
}

export default insuranceRoute;
