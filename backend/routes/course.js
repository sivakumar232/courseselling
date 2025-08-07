const { Router } = require("express");
const courseRouter = Router();
const userMiddleware = require("../middleware/usermid")
const { purchaseModel, userModel, courseModel } = require("../db")
courseRouter.post("/purchase", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const courseId = req.body.courseId;
  //razerpay check  needed here
  const purchasecheck = await purchaseModel.findOne({
    userId,
    courseId
  })
  if (purchasecheck) {
    return res.json({
      message: "you have already bought this course"
    })
  } else {
    await purchaseModel.create({
      userId,
      courseId
    })
    res.json({
      message: "you have successfully bought the course"
    })
  }
});

courseRouter.get("/preview", userMiddleware, async (req, res) => {
  const course = await courseModel.find({});
  res.json({
    course
  })
});

module.exports = courseRouter;
