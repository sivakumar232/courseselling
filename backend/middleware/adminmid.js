const jwt=require("jsonwebtoken");
function adminMiddleware(req,res,next){
    const token=req.headers.authorization;
    if(!token){
        res.json({
            message:"token is required"
        })
    }
    const decoded=jwt.verify(token,process.env.SECRET_KEY);
    if(decoded){
        req.adminId=decoded.id;
        next();
    }
    else{
        res.status(403).json({
            message:"session expired"
        })
    }
}

module.exports={adminMiddleware:adminMiddleware}