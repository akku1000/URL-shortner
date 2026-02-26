import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const protect=async(req,res,next)=>{
    try {
        const accessToken=req.cookies.accessToken;
        console.log(req.cookies);
        if(!accessToken){
            return res.status(401).json({message:"Unauthorized 1"});
        }
        const decoded=jwt.verify(accessToken,process.env.JWT_SECRET);
        const user=await User.findById(decoded.userid).select('-password');
        if(!user){
            return res.status(401).json({message:" Unauthorized 2"});
        }
        req.user=user;
        next();
    } catch (error) {
          console.log("1");
        return res.status(401).json(error.message||{message:"Unauthorized 3"});
    }
}

export default protect;