import fastify from "fastify";

import patientRoute from "./modules/patient/patient.route";
import dentistRoute from "./modules/dentist/dentist.route";

const fastity = fastify();

fastity.register(patientRoute, { prefix: "/api/patients" });
fastity.register(dentistRoute, { prefix: "/api/dentists" });

const main = async () => {
  try {
    fastity.listen({
      host: "0.0.0.0",
      port: process.env.PORT ? Number(process.env.PORT) : 5000,
    });
    console.log("Server running...");
  } catch (err) {
    fastity.log.error(err);
  }
};

main();
