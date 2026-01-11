const express = require("express");
const cors = require("cors");

const app = express();


app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
  })
);app.use(express.json());


let amis = [];
let currentVersion = "v1.0.0";



/**
 * GET /
 * List all AMIs
 */
app.get("/", (req, res) => {
  res.json(amis);
});

/**
 * GET /:id
 * Get AMI by ID
 */
app.get("/:id", (req, res) => {
  const ami = amis.find(a => a.ami_id === req.params.id);
  res.json(ami || {});
});

/**
 * POST /build
 * Create a new AMI
 */
app.post("/build", (req, res) => {
  const ami = {
    ami_id: `ami-${Date.now()}`,
    status: "BUILDING",
    version: currentVersion,
    createdAt: new Date().toISOString(),
    osType: "Ubuntu 22.04",
    tags: {
      env: "dev",
      team: "platform"
    }
  };

  amis.push(ami);

  setTimeout(() => {
    const shouldFail = Math.random() < 0.3;
    ami.status = shouldFail ? "FAILED" : "AVAILABLE";
  }, 3000);

  res.status(201).json(ami);
});


app.post("/retry", (req, res) => {
  const { id } = req.body;
  const ami = amis.find(a => a.ami_id === id);

  if (!ami) {
    return res.status(404).json({ error: "AMI not found" });
  }

  if (ami.status !== "FAILED") {
    return res
      .status(400)
      .json({ error: "Retry allowed only for FAILED AMIs" });
  }

  ami.status = "BUILDING";

  setTimeout(() => {
    ami.status = "AVAILABLE";
  }, 3000);

  res.json(ami);
});


app.post("/publish", (req, res) => {
  const { id } = req.body;
  const ami = amis.find(a => a.ami_id === id);

  if (!ami) {
    return res.status(404).json({ error: "AMI not found" });
  }

  if (ami.status !== "AVAILABLE") {
    return res.status(400).json({ error: "AMI not publishable" });
  }

  ami.status = "PUBLISHED";
  res.json(ami);
});


module.exports = app;
