import { FastifyInstance } from "fastify";
import {
  createUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserByIdHandler,
  deleteUserByIdHandler,
} from "./user.controller";

async function userRoute(fastify: FastifyInstance) {
  // POST /api/users
  fastify.post("/", createUserHandler);

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
