const express = require("express");
const { v4: uuid } = require("uuid");

const app = express();
app.use(express.json());

let amis = [];

app.post("/api/ami/build", (req, res) => {
  const ami = {
    ami_id: "ami-" + uuid().slice(0, 8),
    status: "BUILDING",
    version: "v1.0.0",
    createdAt: new Date()
  };
  amis.push(ami);

  setTimeout(() => {
    ami.status = "AVAILABLE";
  }, 5000);

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
