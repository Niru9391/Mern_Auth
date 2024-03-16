import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authroute from './routes/auth.router.js'
import  path  from 'path';
import cookieParser from 'cookie-parser';
const __dirname = path.resolve()
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
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});


app.use('/api/user',userRoutes)
app.use('/api/auth',authroute)

//CREATING A MIDDLWARE 
app.listen(3000,(req,res)=>{
  console.log("sunn raha hai n tu");
})
app.use((err,req,res,next)=>{
  const statuscode =err.statuscode||500;
  const message = err.message||'Internal server error'
  return res.status(statuscode).json({
    succes:false,
    message,
    statuscode
  })
})
console.log()
