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
  fastify.get("/", getAllUsersHandler);

  // GET /api/users/:userId
  fastify.get("/:userId", getUserByIdHandler);

  // PUT /api/users/:userId
  fastify.put("/:userId", updateUserByIdHandler);

  // DELETE /api/users/:userId
  fastify.delete("/:userId", deleteUserByIdHandler);
}

export default userRoute;
