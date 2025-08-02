const {Router}=require("express");

const adminRouter=Router();

adminRouter.post("/login",async(req,res)=>{
    res.json({
        message:"login endpoint "
    })
})
adminRouter.post("/signup",async(req,res)=>{
    res.json({
        message:"signup endpoint "
    })
})
adminRouter.post("/course",async(req,res)=>{
    res.json({
        message:"add course endpoint "
    })
})
adminRouter.put("/course",async(req,res)=>{
    res.json({
        message:"add course endpoint "
    })
})
adminRouter.get("/course",async(req,res)=>{
    res.json({
        message:"add course endpoint "
    })
})


module.exports=adminRouter;