import { FastifyInstance, FastifyServerOptions } from "fastify";
import {
  createDentistHandler,
  getAllDentistsHandler,
  getDentistByIdHandler,
  updateDentistByIdHandler,
} from "./dentist.controller";

import { ICreateDentist, IParams, IUpdateDentist } from "./dentist.schema";

async function routes(fastify: FastifyInstance, options: FastifyServerOptions) {
  fastify.post<{ Querystring: ICreateDentist }>("/", createDentistHandler);
  fastify.get("/", getAllDentistsHandler);
  fastify.get<{ Params: IParams }>("/:dentistId", getDentistByIdHandler);
  fastify.put<{ Params: IParams; Querystring: IUpdateDentist }>(
    "/:dentistId",
    updateDentistByIdHandler
  );
}

export default routes;
