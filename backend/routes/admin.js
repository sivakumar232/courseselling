const {Router}=require("express");
const {adminModel}=require("../db");

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
adminRouter.post("/",async(req,res)=>{
    res.json({
        message:"add course endpoint "
    })
})
adminRouter.put("/",async(req,res)=>{
    res.json({
        message:"add course endpoint "
    })
})
adminRouter.get("/bulk",async(req,res)=>{
    res.json({
        message:"add course endpoint "
    })
})
module.exports=adminRouter;