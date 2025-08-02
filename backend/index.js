const express=require("express");
const app=express();
const port=process.env.PORT || 3000;
const {userRouter}=require("./routes/user.routes");
const {adminRouter}=require("./routes/admin.routes");
const {courseRouter}=require("./routes/course.routes");
app.use(express.json());
app.use("api/users",userRouter);
app.use("api/admin",adminRouter);
app.use("api/course",courseRouter);


app.listen(port,()=>{
    console.log("server started at port "+port);
})