import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express, { type Application } from "express";
import { auth } from "./lib/auth";
import routes from "./routes";

const app: Application = express();
app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json());
app.use(
  cors({
    origin: `${process.env.APP_URL}`,
    credentials: true,
  })
);

// routes
app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

export default app;
