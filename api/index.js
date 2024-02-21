import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config({path: '../.env' });

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("are bhai tu connect ho gya.");
  })
  .catch((err) => {
    console.log(err);
  });

const app= express()
app.listen(3000,()=>{
    console.log("sunn raha hai n tu");
    console.log(process.env.MONGO)
  
})