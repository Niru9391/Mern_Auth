import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs'
import {errorHandler} from '../utils/error.js';
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



export const google = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = user._doc;
        const expiryDate = new Date(Date.now() + 3600000); 
        res
          .cookie('access_token', token, {
            httpOnly: true,
            expires: expiryDate,
          })
          .status(200)
          .json(rest);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({
          username:
            req.body.name.split(' ').join('').toLowerCase() +
            Math.random().toString(36).slice(-8),
          email: req.body.email,
          password: hashedPassword,
          profilePicture: req.body.photo,
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password: hashedPassword2, ...rest } = newUser._doc;
        const expiryDate = new Date(Date.now() + 3600000); 
        res
          .cookie('access_token', token, {
            httpOnly: true,
            expires: expiryDate,
          })
          .status(200)
          .json(rest);
      }
    } catch (error) {
      next(error);
    }
  };
  
  export const signout = (req, res) => {
    res.clearCookie('access_token').status(200).json('Signout success!');
  };