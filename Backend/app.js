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

app.get("/", (req, res) => {
  res.send("AMI backend running");
});

app.use("/api/ami", amiRoutes);

// Error handling middleware (must be before catch-all)
app.use((err, req, res, next) => {
  console.error("Express error:", err);
  if (!res.headersSent) {
    res.status(err.status || 500).json({
      error: "Internal Server Error",
      message: err.message
    });
  }
});

// Catch-all handler for Vercel - must be last
app.use((req, res) => {
  res.status(404).json({ error: "Not Found", path: req.path });
});

export default app;

