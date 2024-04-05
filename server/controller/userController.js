import { response } from "express";
import User from "../model/userModel.js";
import Token from "../model/token.js";
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

// bcrypt is used for encryption using salt
export const signUpUser=async (req,res)=>{
    try{
        // const salt=await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        const user = {username:req.body.username,name:req.body.name,password:hashedPassword};

        const newUser=new User(user);
        await newUser.save();

        return res.status(200).json({message:"Signup successful"})
    }
    catch(err){
        return res.status(500).json({message:"Error while signup the user"})
    }
}

export const loginUser=async (req,res)=>{
    let user = await User.findOne({//find match and return tje whole object
        username:req.body.username
    })
    if(!user){
        return response.status(400).json({message:"Username doesn't match"})
    }
    try{
        let match=await bcrypt.compare(req.body.password,user.password);
        ///JWT authentication
        if(match){
            const accessToken=jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY,{expiresIn:"15m"});
            const refreshToken=jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY);

            const newToken=new Token({token:refreshToken});
            await newToken.save();

            return res.status(200).json({accessToken:accessToken,refreshToken:refreshToken,name:user.name,username:user.username});
        }
        else{
            response.status(400).json({message:"Password doesn't match"})
        }
    }
    catch(error){
        return res.status(500).json({message:"Error while login in user"})
    }
}
