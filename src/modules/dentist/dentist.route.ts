import { FastifyInstance, FastifyServerOptions } from "fastify";
import {
  createDentistHandler,
  getAllDentistsHandler,
  getDentistByIdHandler,
  updateDentistByIdHandler,
} from "./dentist.controller";

import { ICreateDentist, IParams, IUpdateDentist } from "./dentist.schema";

async function routes(fastify: FastifyInstance, options: FastifyServerOptions) {
  fastify.post<{ Querystring: ICreateDentist }>(
    "/",
    { onRequest: [fastify.authenticate] },
    createDentistHandler
  );
  fastify.get(
    "/",
    { onRequest: [fastify.authenticate] },
    getAllDentistsHandler
  );
  fastify.get<{ Params: IParams }>(
    "/:dentistId",
    { onRequest: [fastify.authenticate] },
    getDentistByIdHandler
  );
  fastify.put<{ Params: IParams; Querystring: IUpdateDentist }>(
    "/:dentistId",
    { onRequest: [fastify.authenticate] },
    updateDentistByIdHandler
  );
}

export default routes;
