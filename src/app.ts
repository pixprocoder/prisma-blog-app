import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express, { type Application } from "express";
import { auth } from "./lib/auth";
import routes from "./routes";
import errorHandler from "./middlewares/globalErrorHandler";
import { notFound } from "./middlewares/notFound";

const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.all("/api/auth/{*any}", toNodeHandler(auth));

// routes
app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use(notFound);
app.use(errorHandler);

export default app;
