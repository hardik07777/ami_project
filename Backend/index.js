const express = require("express");
const { v4: uuid } = require("uuid");
const cors = require("cors");


const app = express();
app.use(cors());          
app.use(express.json());

let amis = [];
let currentVersion = "v1.0.0";

app.post("/api/ami/publish", (req, res) => {
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


app.post("/api/ami/build", (req, res) => {
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

  // Simulate build result
  setTimeout(() => {
    const shouldFail = Math.random() < 0.3; // 30% failure

    ami.status = shouldFail ? "FAILED" : "AVAILABLE";
  }, 3000);

  res.status(201).json(ami);
});
app.post("/api/ami/retry", (req, res) => {
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
    ami.status = "AVAILABLE";
  }, 3000);

  res.json(ami);
});


app.get("/api/ami", (req, res) => {
  res.json(amis);
});

app.get("/api/ami/:id", (req, res) => {
  const ami = amis.find(a => a.ami_id === req.params.id);
  res.json(ami || {});
});

app.listen(4000, () => console.log("Backend running on 4000"));
