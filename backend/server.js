const connectToDb=require('./config/db')
const express=require('express')
const dotenv = require('dotenv');
const Listing=require('./models/listing')
const app=express();
// const initDB=require('./init/index')
// initDB();
dotenv.config();
connectToDb();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
