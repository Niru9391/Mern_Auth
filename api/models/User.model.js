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
    profilrPicture:{
        type:String,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.indiatvnews.com%2Fprofile%2Fsunny-leone%2Fnews%2F27&psig=AOvVaw0qrNzK0aLkwF8i-NUqdFfi&ust=1710164192828000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCOCgnZzo6YQDFQAAAAAdAAAAABAE",
        

    }

},{timestamps:true})


const User=mongoose.model('User',userSchema)
export default User;