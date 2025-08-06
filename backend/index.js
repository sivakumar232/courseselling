const express = require("express");
const app = express();
require("dotenv").config();
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const courseRouter = require("./routes/course");

app.use(express.json());

app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/course", courseRouter); 
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});