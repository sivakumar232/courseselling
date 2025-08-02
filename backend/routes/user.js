const {Router}=require("express");
const userRouter=Router();



userRouter.post("/login",async(req,res)=>{
    res.json({
        message:"login endpoint"
    })
})
userRouter.post("/signup",async(req,res)=>{
    res.json({
        message:"login endpoint"
    })
})
userRouter.post("/course",async(req,res)=>{
    res.json({
        message:"adding user course "
    })
})
userRouter.put("/course",async(req,res)=>{
    res.json({
        message:"updating user course "
    })
})

userRouter.get("/course",async(req,res)=>{
    res.json({
        message:"getting user course "
    })
})
module.exports=userRouter;