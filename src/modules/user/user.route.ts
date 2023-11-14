import { FastifyInstance } from "fastify";
import {
  createUserHandler,
  userLoginHandler,
  getUserByIdHandler,
  updateUserByIdHandler,
  getAllUsersHandler,
} from "./user.controller";

import {
  CreateUserRequestBodyType,
  PutUserByIdBodyRequestType,
  UserLoginType,
} from "./user.schema";

async function userRoute(fastify: FastifyInstance) {
  // POST /api/users
  fastify.post<{ Body: CreateUserRequestBodyType }>(
    "/",
    { onRequest: [fastify.authenticate] },
    createUserHandler
  );

  // POST /api/users/login
  fastify.post<{ Body: UserLoginType }>("/login", userLoginHandler);

  // GET /api/users
  fastify.get("/", { onRequest: [fastify.authenticate] }, getUserByIdHandler);

  // GET /api/users/all
  fastify.get(
    "/all",
    { onRequest: [fastify.authenticate] },
    getAllUsersHandler
  );

  // PUT /api/users
  fastify.put<{ Body: PutUserByIdBodyRequestType }>(
    "/",
    { onRequest: [fastify.authenticate] },
    updateUserByIdHandler
  );
}

export default userRoute;
