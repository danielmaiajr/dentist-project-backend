import fastify from "fastify";

const app = fastify();
app.get("/", () => {
  return { user: "first" };
});

app.listen({ host: "0.0.0.0", port: 5000 }).then(() => {
  console.log("Server running...");
});
