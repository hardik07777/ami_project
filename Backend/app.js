import express from "express";
import cors from "cors";
import amiRoutes from "./api/ami.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
  })
);

app.use(express.json());

app.use("/api/ami", amiRoutes);

app.get("/", (req, res) => {
  res.send("AMI backend running");
});

export default app;
