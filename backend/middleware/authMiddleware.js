import  jwt  from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect=asyncHandler(async(req,res,next )=>{
    let token
    token= req.cookies.jwt

    if(token){
       
        try {
            const decoded= jwt.verify(token,process.env.JWT_SECRET)
            const user=await User.findById(decoded.user)
            // if(user.isBlock){
            //     console.log('blokedddddddd')
            //     res.status(401)
            //     throw new Error('User blocked by admin')
                
            // }
            req.user=await User.findById(decoded.user).select('-password')
            
            next()
            
        } catch (error) {
            res.status(401)
            throw new Error('Not authorized, Invalid token')
            
        }

    }else{
        res.status(401)
        throw new Error('Not authorized, No token')
    }
})

export {
    protect
}