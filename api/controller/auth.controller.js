import User from "../models/User.model.js"
import bcryptjs from 'bcryptjs'
export const  signup = async(req,res)=>{
    const { username,email,password}=req.body
    
    const newUser=new User({username,email,password:bcryptjs.hashSync(password,6)})
   
    try{
        await newUser.save()
        res.status(201).json('successfully your data loaded to databse')
    }
    catch(error){
        res.status(500).json(error.message);

    }
    
    
    
}