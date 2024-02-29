import User from "../models/User.model.js"
import bcryptjs from 'bcryptjs'
import errorHandler from '../utils/error.js';
export const  signup = async(req,res,next)=>{
    const { username,email,password}=req.body
    
    const newUser=new User({username,email,password:bcryptjs.hashSync(password,6)})
   
    try{
        await newUser.save()
        res.status(201).json('successfully your data loaded to databse')
    }
    catch(error){
        next(errorHandler(300,'Something is wrong please try again! '));

    }
    
    
    
}