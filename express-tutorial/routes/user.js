import express from "express";

const routes = express();

routes.get("/:id", (req, res) => {
  res.send("Received a GET request, param: " + req.params.id);
});

routes.post("/", (req, res) => {
  console.log(JSON.stringify(req.body, null, 2));
  res.json({
    success: true,
    user: req.body.username
  });
});

routes.put("/", (req, res) => {
  res.status(400).json({ message: "Hey, you. Bad Request!" });
});

routes.delete("/", (req, res) => {
  res.send("Received a DELETE Request");
});

export default routes;
