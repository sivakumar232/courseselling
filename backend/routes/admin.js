const {Router}=require("express");
const {adminModel}=require("../db");
const {courseModel}=require("../db");
const adminRouter=Router();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const {adminMiddleware}=require("../middleware/adminmid");
require("dotenv").config();


//signin route
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

//signup route
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

//to create a new course
adminRouter.post("/course",adminMiddleware,async(req,res)=>{
    const adminId=req.adminId;
    const{title,description,price,image}=req.body;
    if(!title||!description||!price||!image){
        res.json({
            message:"all feilds are required"
        })
    }
    try{
        const course=await courseModel.create({
            title:title,
            description:description,
            price:price,
            image:image,
            creatorId:adminId
        })
        res.json({
            message:"course created"
        })
    }catch(err){
        console.log(err);
    }

})

//to update a course
adminRouter.put("/course/:courseId", adminMiddleware, async (req, res) => {
    const adminId = req.adminId;
    const { title, description, imageurl, price } = req.body;
    const { courseId } = req.params;

    try {
        const course = await courseModel.findOne({ _id: courseId, creatorId: adminId });

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        course.title = title;
        course.description = description;
        course.price = price;
        course.image = imageurl;

        await course.save();

        res.json({ message: "Course updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});
//to get all the courses
adminRouter.get("/course/bulk",adminMiddleware,async(req,res)=>{
    const adminId=req.adminId;
    const course =await courseModel.find({creatorId:adminId});
    res.json({
        message:"your courses",
        course:course
    })
})
module.exports=adminRouter;