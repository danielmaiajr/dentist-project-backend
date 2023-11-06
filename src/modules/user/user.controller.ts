import { FastifyReply, FastifyRequest } from "fastify";
import {
  CreateUserReplySchema,
  CreateUserRequestBodySchema,
  CreateUserRequestBodyType,
  UserLoginSchema,
  UserLoginType,
} from "./user.schema";

import { hashPassword, verifyPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";

export async function createUserHandler(
  request: FastifyRequest<{ Body: CreateUserRequestBodyType }>,
  reply: FastifyReply
) {
  const parsedBody = CreateUserRequestBodySchema.safeParse(request.body);
  if (!parsedBody.success) return reply.send(parsedBody.error);

  try {
    const hash = await hashPassword(parsedBody.data.password);
    const user = await prisma.user.create({
      data: { email: parsedBody.data.email, password_hash: hash },
    });

    const parsedReply = CreateUserReplySchema.parse(user);
    reply.send(parsedReply);
  } catch (err) {
    console.log(err);
  }
}

export async function userLoginHandler(
  request: FastifyRequest<{ Body: UserLoginType }>,
  reply: FastifyReply
) {
  const parsedBody = UserLoginSchema.safeParse(request.body);
  if (!parsedBody.success) return reply.send(parsedBody.error);

  const user = await prisma.user.findUnique({
    where: { email: parsedBody.data.email },
  });

  if (!user)
    return reply.send({
      message: "Email ou Senha inválidos",
    });

  const verify = await verifyPassword(
    parsedBody.data.password,
    user.password_hash
  );

  if (!verify)
    return reply.send({
      message: "Email ou Senha inválidos",
    });

  reply.jwtSign({ id: user.id }, function (err, token) {
    return reply.send(err || { token: token });
  });
}

export async function getUserByIdHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const user = await prisma.user.findFirst({
      where: { id: Number(request.user.id) },
    });

    if (!user) reply.code(500);

    const parsedReply = CreateUserReplySchema.parse(user);
    reply.send(parsedReply);
  } catch (err) {
    reply.send(err);
  }
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
