import { FastifyInstance, FastifyServerOptions } from "fastify";
import {
  createPatientHandler,
  deletePatientByIdHandler,
  getAllPatientsHandler,
  getPatientByIdHandler,
  updatePatientByIdHandler,
} from "./patient.controller";

import { ICreatePatient, IParams, IUpdatePatient } from "./patient.schema";

async function routes(fastify: FastifyInstance, options: FastifyServerOptions) {
  fastify.post<{ Querystring: ICreatePatient }>("/", createPatientHandler);
  fastify.get("/", getAllPatientsHandler);
  fastify.get<{ Params: IParams }>("/:patientId", getPatientByIdHandler);
  fastify.put<{ Params: IParams; Querystring: IUpdatePatient }>(
    "/:patientId",
    updatePatientByIdHandler
  );
  fastify.delete<{ Params: IParams }>("/:patientId", deletePatientByIdHandler);
}

export default routes;
