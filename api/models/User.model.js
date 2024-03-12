import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true

    },
    email:{
        type:String,
        require:true,
        unique:true

    },
    password:{
        type:String,
        require:true,
        
    },
    profilePicture:{
        type:String,
        default:'https://rukminim2.flixcart.com/image/850/1000/xif0q/poster/g/u/f/large-hindu-god-lord-shiva-digital-photo-poster-with-uv-textured-original-imagrabk5e3surna.jpeg?q=90&crop=false',
        

    }

},{timestamps:true})


const User=mongoose.model('User',userSchema)
export default User;