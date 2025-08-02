const {Router}=require("express");
const courseRouter=Router();

courseRouter.post("purchase",async(req,res)=>{
    res.json({
        message:"add course endpoint "
    })
})
courseRouter.get("purchase",async(req,res)=>{
    res.json({
        message:"add course endpoint "
    })
})

module.exports={
    courseRouter
}