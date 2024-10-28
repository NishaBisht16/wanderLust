const connectToDb=require('./config/db')
const express=require('express')
const dotenv = require('dotenv');
const app=express();

dotenv.config();
connectToDb();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
