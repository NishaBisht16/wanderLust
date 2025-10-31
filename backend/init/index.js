const connectToDb=require('../config/db')
const express=require('express')
const dotenv = require('dotenv');
const Listing=require('../models/listingModel')
const app=express();
const initData=require('./data')

dotenv.config();
connectToDb();

const initDB=async()=>{
    await Listing.deleteMany({})
    initData.data=initData.data.map((obj)=>({...obj,owner:"69006a4f9be1747602be946c"}))
    await Listing.insertMany(initData.data)
    console.log("Data Initialized")  
}

//  initDB();
module.exports=initDB
