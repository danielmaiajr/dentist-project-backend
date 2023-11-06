import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../utils/prisma";
import { ICreateDentist, IParams, IUpdateDentist } from "./dentist.schema";

export async function createDentistHandler(
  request: FastifyRequest<{ Querystring: ICreateDentist }>,
  reply: FastifyReply
) {
  const { name } = request.query;

  const dentist = await prisma.dentist.create({
    data: {
      name,
    },
  });

  reply.send(dentist);
}

export async function getAllDentistsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const dentist = await prisma.dentist.findMany();

  reply.send(dentist);
}

export async function getDentistByIdHandler(
  request: FastifyRequest<{ Params: IParams }>,
  reply: FastifyReply
) {
  console.log(request.params);
  const { dentistId } = request.params;
  const dentist = await prisma.dentist.findUnique({
    where: { id: Number(dentistId) },
  });

  reply.send(dentist);
}

export async function updateDentistByIdHandler(
  request: FastifyRequest<{ Params: IParams; Querystring: IUpdateDentist }>,
  reply: FastifyReply
) {
  const { dentistId } = request.params;
  const { name } = request.query;

  const data = {
    ...(name && { name }),
  };

  const dentist = await prisma.dentist.update({
    where: { id: Number(dentistId) },
    data,
  });

  reply.send(dentist);
}
