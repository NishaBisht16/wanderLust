const express = require('express')
const app = express()
const dotenv = require('dotenv')
const connectToDB = require('./config/db')
const cors = require('cors')
const session=require('express-session')
const passport=require('passport')
const LocalStrategy=require('passport-local')
const User=require('./models/userModel')
const listingroute = require('./routes/listingRoute')
const reviewroute = require('./routes/reviewRoute')
const authroute=require('./routes/authRoute')
// const initDB=require('./init/index')
// initDB();
// const cookieparser=require("cookie-parser")
// app.use(cookieparser())


const sessionOption={
    secret:"@#$#RFER#$@!!@##RRFCD",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge :  7 * 24 * 60 * 60 * 1000,
        httponly:true
    },
}
app.use(session(sessionOption))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


dotenv.config()
connectToDB()


app.use(express.json())


const allowedOrigins = ['http://localhost:8000', 'http://localhost:3000', 'https://wanderLust.com', 'http://localhost:3001'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true)
    },
    credentials: true
}))

app.use('/api', listingroute)
app.use('/api', reviewroute)
app.use('/api/auth',authroute)


module.exports = app;