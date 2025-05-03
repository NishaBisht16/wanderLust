const express = require('express')
const app = express()
require('dotenv').config()
const connectToDB = require('./config/db')
const cors = require('cors')
const listingroute = require('./routes/listingRoute')
const reviewroute = require('./routes/reviewRoute')
const authroute=require('./routes/authRoute')
const bodyParser=require('body-parser')


// const initDB=require('./init/index')
// initDB();
// const cookieparser=require("cookie-parser")
// app.use(cookieparser())

connectToDB()




app.use(bodyParser.json({ limit: '50mb' })); 
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


const allowedOrigins = ['http://localhost:8000', 'http://localhost:3000', 'https://wanderLust.com', 'http://localhost:3002'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true)
    },
    credentials: true,

}))

app.use('/api', listingroute)
app.use('/api', reviewroute)
app.use('/api/auth',authroute)


module.exports = app;