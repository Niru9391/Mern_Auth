import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authroute from './routes/auth.router.js'
dotenv.config()


mongoose
.connect(process.env.MONGO)
.then(()=>{
  console.log("connected to database")
})
.catch((err)=>{
  console.log(err);
})



const app= express()

app.use(express.json());
app.listen(3000,()=>{
    console.log("sunn raha hai n tu");
    
  
})

app.use('/api/user',userRoutes)
app.use('/api/auth',authroute)


//CREATING A MIDDLWARE 

app.use((err,req,res,next)=>{
  const statuscode =err.statuscode||500;
  const message = err.message||'Internal server error'
  return res.status(statuscode).json({
    succes:false,
    message,
    statuscode
  })
})