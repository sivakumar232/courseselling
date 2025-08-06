const {Router}=require("express");
const {adminModel}=require("../db");
const adminRouter=Router();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const {adminMiddleware}=require("../middleware/adminmid");
require("dotenv").config();

adminRouter.post("/signin",async(req,res)=>{
    const{email,password}=req.body;
    if(!email||!password){
        res.json({
            message:"all feilds are required"
        })
    }
    const admin =await adminModel.findOne({email});
    if(admin){
        const token=jwt.sign({
            id:admin._id,
            email:admin.email
        },process.env.SECRET_KEY);
        res.json({
            message:"login success",
            token:token
        })

    }else{
        res.json({
            message:"Invalid credentials"
        })
    }
})
adminRouter.post("/signup",async(req,res)=>{
    const{email,password,firstname,lastname}=req.body;
    if(!email||!password||!firstname||!lastname){
        res.json({
            message:"all feilds are required"
        })
    }
    const salt_rounds=10;
    try{
        const existingadmin=await adminModel.findOne({email});
        if(existingadmin){
            res.json({
                message:"user already exist"
            })
        }
    const hashed_password=await bcrypt.hash(password,salt_rounds);
    const admin=new adminModel({
        email:email,
        password:hashed_password,
        firstname:firstname,
        lastname:lastname
    });
    await admin.save();
    res.json({
        message:"admin account created"
    })
        }catch(err){
        console.log(err);
    }
})
adminRouter.post("/course",adminMiddleware,async(req,res)=>{
    res.json({
        message:"add course endpoint "
    })
})
adminRouter.put("/course",adminMiddleware,async(req,res)=>{
    res.json({
        message:"add course endpoint "
    })
})
adminRouter.get("/course/bulk",adminMiddleware,async(req,res)=>{
    res.json({
        message:"add course endpoint "
    })
})
module.exports=adminRouter;