import { FastifyInstance, FastifyServerOptions } from "fastify";
import {
  createPatientHandler,
  deletePatientByIdHandler,
  getAllPatientsHandler,
  getPatientByIdHandler,
  updatePatientByIdHandler,
} from "./patient.controller";

import { ICreatePatient, IParams } from "./patient.schema";

async function routes(fastify: FastifyInstance, options: FastifyServerOptions) {
  fastify.post<{ Querystring: ICreatePatient }>("/", createPatientHandler);
  fastify.get("/", getAllPatientsHandler);
  fastify.get<{ Params: IParams }>("/:patientId", getPatientByIdHandler);
  fastify.put<{ Params: IParams }>("/:patientId", updatePatientByIdHandler);
  fastify.delete<{ Params: IParams }>("/:patientId", deletePatientByIdHandler);
}

export default routes;
