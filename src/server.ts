import fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const app = fastify();

const prisma = new PrismaClient();

app.get("/pacients", async () => {
  const pacients = await prisma.pacient.findMany();

  return { pacients };
});

app.post("/pacients", async (request, reply) => {
  const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
  });

  const { name, email } = createUserSchema.parse(request.body);

  await prisma.pacient.create({
    data: {
      name,
      email,
    },
  });

  return reply.status(201).send();
});

app
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 5000,
  })
  .then(() => {
    console.log("Server running...");
  });
