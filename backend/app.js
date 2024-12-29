const express=require('express')
const app=express()
const dotenv=require('dotenv')
const connectToDB=require('./config/db')
const cors=require('cors')

const listingroute=require('./routes/listingRoute')
const  reviewroute=require('./routes/reviewRoute')
// const initDB=require('./init/index')
// initDB();

dotenv.config()
connectToDB()


app.use(express.json())
// app.use('/images', express.static(path.join(__dirname, 'images')));


const allowedOrigins = ['http://localhost:8000', 'http://localhost:3000', 'https://wanderLust.com','http://localhost:3001'];

app.use(cors({
    origin: function(origin,callback){
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin)===-1){
            const msg = 'The CORS policy for this site does not allow access from the specified origin.';
            return callback(new Error(msg), false);
        }
        return callback(null,true)
    },
    credentials:true
}))

app.use('/api',listingroute)
app.use('/api',reviewroute)
module.exports=app;