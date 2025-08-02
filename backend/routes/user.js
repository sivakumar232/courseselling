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

userRouter.post("/addcourse",async(req,res)=>{
    res.json({
        message:"add course endpoint "
    })
})

userRouter.put("/addcourse",async(req,res)=>{
    res.json({
        message:"add course endpoint "
    })
})

userRouter.get("/addcourse",async(req,res)=>{
    res.json({
        message:"add course endpoint "
    })
})
module.exports=userRouter;