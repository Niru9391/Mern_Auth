import User from "../models/User.model.js"
import bcryptjs from 'bcryptjs'
import errorHandler from '../utils/error.js';
import jwt from 'jsonwebtoken';
export const  signup = async(req,res,next)=>{
    const { username,email,password}=req.body
    
    const newUser=new User({username,email,password:bcryptjs.hashSync(password,6)})
   
    try{
        await newUser.save()
        res.status(201).json('successfully, your data has been  loaded to databse')
    }
    catch(error){
        next(errorHandler(300,'Something is wrong please try again! '));

    }
    
    
    
}


export const signin = async(req,res,next)=>{
    const {email,password}=req.body;
    try{
        const validata = await User.findOne({email});
        if(!validata){
            return next(errorHandler(404,'User not found'));

        }

       const validpassword =await bcryptjs.compareSync(password,validata.password);
       if(!validpassword){
        return next(errorHandler(401,'Invalid information'))
       }
       const token = jwt.sign({id:validata._id},process.env.JWT_SECRET)
       const {password:hashedPassword,...rest}= validata._doc;
       res.cookie('access_token',token,{httpOnly:true,  expires:new Date()}).status(200).json(rest)

    }
    catch(error){
        next(error);
    }
}