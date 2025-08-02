const mongoose = require("mongoose");
const { Schema } = mongoose;
require("dotenv").config({ path: "../.env" }); 
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("connected db"))
  .catch(err => console.error("DB connection error:", err));

const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstname: String,
  lastname: String
});

const adminSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstname: String,
  lastname: String
});

const courseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  creatorId: ObjectId
});

const purchaseSchema = new Schema({
  userId: ObjectId,
  courseId: ObjectId
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchaseModel
};
