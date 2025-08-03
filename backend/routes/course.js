const { Router } = require("express");
const courseRouter = Router();

courseRouter.post("/purchase", async (req, res) => {
  res.json({ message: "purchase course endpoint" });
});
courseRouter.get("/purchase", async (req, res) => {
  res.json({ message: "get purchases endpoint" });
});

module.exports = courseRouter;
