import { FastifyInstance, FastifyServerOptions } from "fastify";
import {
  createPatientHandler,
  deletePatientByIdHandler,
  getAllPatientsHandler,
  getPatientByIdHandler,
  updatePatientByIdHandler,
} from "./patient.controller";

import {
  CreatePatientRequestBodyType,
  GetPatientByIdRequestParamsType,
  PutPatientByIdRequestBodyType,
} from "./patient.schema";

async function routes(fastify: FastifyInstance, options: FastifyServerOptions) {
  // POST /api/patients
  fastify.post<{ Body: CreatePatientRequestBodyType }>(
    "/",
    createPatientHandler
  );

  // GET /api/patients
  fastify.get("/", getAllPatientsHandler);

  // GET /api/patients/:patientId
  fastify.get<{ Params: GetPatientByIdRequestParamsType }>(
    "/:patientId",
    getPatientByIdHandler
  );

  // PUT /api/patients/:patientId
  fastify.put<{
    Params: GetPatientByIdRequestParamsType;
    Body: PutPatientByIdRequestBodyType;
  }>("/:patientId", updatePatientByIdHandler);

  // DELETE /api/patients/:patientId
  fastify.delete<{ Params: GetPatientByIdRequestParamsType }>(
    "/:patientId",
    deletePatientByIdHandler
  );
}

export default routes;
