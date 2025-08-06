const {Router}=require("express");
const userRouter=Router();
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
require("dotenv").config();
const {userModel}=require("../db");
const {userMiddleware}=require("../middleware/usermid");
userRouter.post("/signin",async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        res.json({
            message:"email and password is required"
        })
    }
    try{
        const user=await userModel.findOne({email});
        if(user){
            const token=jwt.sign({
                id:user._id,
                email:user.email
            },process.env.SECRET_KEY);
            res.json({
                message:"login success",
                token:token
            })
        }
    }catch(err){
        console.log(err);
    }
})
userRouter.post("/signup",async(req,res)=>{
    const {email,password,firstname,lastname}=req.body;
    if(!email||!password||!firstname||!lastname){
        res/json({
            message:"all feilds are required"
        })
    }
    try{
        const hashed_password=await bcrypt.hash(password,10);
        const user=new userModel({
            email:email,
            password:hashed_password,
            firstname:firstname,
            lastname:lastname
        })
        await user.save();
        res.json({
            message:"user account created"
        })
    }catch(err){
        console.log(err);
    }
})
userRouter.post("/course",userMiddleware,async(req,res)=>{
    res.json({
        message:"adding user course "
    })
})
userRouter.put("/course",userMiddleware,async(req,res)=>{
    res.json({
        message:"updating user course "
    })
})

userRouter.get("/course",userMiddleware,async(req,res)=>{
    res.json({
        message:"getting user course "
    })
})
module.exports=userRouter;