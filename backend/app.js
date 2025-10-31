const express = require('express')
const app = express()
require('dotenv').config()
const connectToDB = require('./config/db')
const cors = require('cors')
const listingroute = require('./routes/listingRoute')
const reviewroute = require('./routes/reviewRoute')
const authroute=require('./routes/authRoute')
const maproute=require('./routes/mapRoute')
const bodyParser=require('body-parser')


// const initDB=require('./init/index')
// initDB();
// const cookieparser=require("cookie-parser")
// app.use(cookieparser())

connectToDB()

app.use((req, res, next) => {
  res.removeHeader("Cross-Origin-Opener-Policy");
  res.removeHeader("Cross-Origin-Embedder-Policy");
  next();
});



app.use(bodyParser.json({ limit: '50mb' })); 
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


const allowedOrigins = [process.env.API_URL, process.env.FRONTEND_URL,];

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
app.use('/api',maproute)

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  
  res.status(status).json({
    success: 0,
    status,
    message,
  });
});


module.exports = app;