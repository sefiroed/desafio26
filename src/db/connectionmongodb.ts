import mongoose from 'mongoose';
import { query } from 'express';


const URL = 'mongodb://localhost:27017/ecommerce';


export async function connect() {

  try {
    await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("DB CONNECTED!!");

  } catch (e) {
    console.log("Error: ", e);
    
  }

};
