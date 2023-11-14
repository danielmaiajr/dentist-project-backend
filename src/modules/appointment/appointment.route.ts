import { FastifyInstance, FastifyServerOptions } from "fastify";
import {
  CreateAppointmentRequestBodyType,
  GetAppointmentByIdRequestParamsType,
  PutAppointmentByIdRequestBodyType,
  PutAppointmentByIdRequestParamsType,
} from "./appointment.schema";
import {
  createAppointmentHandler,
  getAllAppointmentsHandler,
  getAppointmentByIdHandler,
  updateAppointmentByIdHandler,
} from "./appointment.controller";

async function routes(fastify: FastifyInstance, options: FastifyServerOptions) {
  // POST /api/appointments
  fastify.post<{ Body: CreateAppointmentRequestBodyType }>(
    "/",
    { onRequest: [fastify.authenticate] },
    createAppointmentHandler
  );

  // GET /api/appointments
  fastify.get(
    "/",
    { onRequest: [fastify.authenticate] },
    getAllAppointmentsHandler
  );

  // GET /api/appointmenst/:appointmentId
  fastify.get<{ Params: GetAppointmentByIdRequestParamsType }>(
    "/:appointmentId",
    { onRequest: [fastify.authenticate] },
    getAppointmentByIdHandler
  );

  // PUT /api/appointments/:appointmentId
  fastify.put<{
    Params: PutAppointmentByIdRequestParamsType;
    Body: PutAppointmentByIdRequestBodyType;
  }>(
    "/:appointmentId",
    { onRequest: [fastify.authenticate] },
    updateAppointmentByIdHandler
  );
}

export default routes;
