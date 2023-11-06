import { FastifyInstance } from "fastify";
import {
  createUserHandler,
  userLoginHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserByIdHandler,
  deleteUserByIdHandler,
} from "./user.controller";

import { CreateUserRequestBodyType, UserLoginType } from "./user.schema";

async function userRoute(fastify: FastifyInstance) {
  // POST /api/users
  fastify.post<{ Body: CreateUserRequestBodyType }>("/", createUserHandler);

  // POST /api/users/login
  fastify.post<{ Body: UserLoginType }>("/login", userLoginHandler);

  // GET /api/users
  fastify.get("/", { onRequest: [fastify.authenticate] }, getUserByIdHandler);

  // PUT /api/users
  fastify.put(
    "/",
    { onRequest: [fastify.authenticate] },
    updateUserByIdHandler
  );

  // DELETE /api/users
  fastify.delete(
    "/",
    { onRequest: [fastify.authenticate] },
    deleteUserByIdHandler
  );
}

export default userRoute;
