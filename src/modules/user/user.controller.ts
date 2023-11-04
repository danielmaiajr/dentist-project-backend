import { FastifyReply, FastifyRequest } from "fastify";

export async function createUserHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  reply.send("createUserHandler");
}

export async function getAllUsersHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  reply.send("getAllUsersHandler");
}

export async function getUserByIdHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  reply.send("getUserByIdHandler");
}

export async function updateUserByIdHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  reply.send("updateUserByIdHandler");
}

export async function deleteUserByIdHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  reply.send("deleteUserByIdHandler");
}
