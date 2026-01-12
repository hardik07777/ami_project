import express from "express";

const router = express.Router();

let amis = [];
let currentVersion = "v1.0.0";

/**
 * GET /
 * List all AMIs
 */
router.get("/", (req, res) => {
  res.json(amis);
});

/**
 * GET /:id
 * Get AMI by ID
 */
router.get("/:id", (req, res) => {
  const ami = amis.find(a => a.ami_id === req.params.id);
  res.json(ami || {});
});

/**
 * POST /build
 */
router.post("/build", (req, res) => {
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
    ami.status = Math.random() < 0.3 ? "FAILED" : "AVAILABLE";
  }, 3000);

  res.status(201).json(ami);
});

router.post("/retry", (req, res) => {
  const { id } = req.body;
  const ami = amis.find(a => a.ami_id === id);

  if (!ami) {
    return res.status(404).json({ error: "AMI not found" });
  }

  if (ami.status !== "FAILED") {
    return res.status(400).json({ error: "Retry allowed only for FAILED AMIs" });
  }

  ami.status = "BUILDING";

  setTimeout(() => {
    ami.status = Math.random() < 0.3 ? "FAILED" : "AVAILABLE";
  }, 3000);

  res.json(ami);
});

router.post("/publish", (req, res) => {
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

export default router;
