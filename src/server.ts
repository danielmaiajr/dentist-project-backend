import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import patientRoute from "./modules/patient/patient.route";
import dentistRoute from "./modules/dentist/dentist.route";
import userRoute from "./modules/user/user.route";
import { FastifyRequest } from "fastify/types/request";
import { FastifyReply } from "fastify/types/reply";

const fastifyApp = fastify();

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { id: number };
    user: { id: number; name: string };
  }
}

declare module "fastify" {
  export interface FastifyInstance {
    authenticate: any;
  }
}

fastifyApp.register(fastifyJwt, {
  secret: "supersecret",
});

fastifyApp.decorate(
  "authenticate",
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      return reply.send(err);
    }
  }
);

fastifyApp.register(patientRoute, { prefix: "/api/patients" });
fastifyApp.register(dentistRoute, { prefix: "/api/dentists" });
fastifyApp.register(userRoute, { prefix: "/api/users" });

const main = async () => {
  try {
    fastifyApp.listen({
      host: "0.0.0.0",
      port: process.env.PORT ? Number(process.env.PORT) : 5000,
    });
    console.log("Server running...");
  } catch (err) {
    fastifyApp.log.error(err);
  }
};

main();
