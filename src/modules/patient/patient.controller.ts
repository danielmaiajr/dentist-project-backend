import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../utils/prisma";
import { ICreatePatient, IParams, IUpdatePatient } from "./patient.schema";

export async function createPatientHandler(
  request: FastifyRequest<{ Querystring: ICreatePatient }>,
  reply: FastifyReply
) {
  const { name, email } = request.query;

  const patient = await prisma.patient.create({
    data: {
      name,
      email,
    },
  });

  reply.send(patient);
}

export async function getAllPatientsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const patient = await prisma.patient.findMany();

  reply.send(patient);
}

export async function getPatientByIdHandler(
  request: FastifyRequest<{ Params: IParams }>,
  reply: FastifyReply
) {
  const { patientId } = request.params;
  const patient = await prisma.patient.findUnique({
    where: { id: Number(patientId) },
  });
  reply.send(patient);
}

export async function updatePatientByIdHandler(
  request: FastifyRequest<{ Params: IParams; Querystring: IUpdatePatient }>,
  reply: FastifyReply
) {
  const { patientId } = request.params;
  const { name, email } = request.query;

  const data = {
    ...(name && { name }),
    ...(email && { email }),
  };

  const patient = await prisma.patient.update({
    where: { id: Number(patientId) },
    data,
  });

  reply.send(patient);
}

export async function deletePatientByIdHandler(
  request: FastifyRequest<{ Params: IParams }>,
  reply: FastifyReply
) {
  const { patientId } = request.params;

  const patient = await prisma.patient.delete({
    where: { id: Number(patientId) },
  });

  reply.send(patient);
}
