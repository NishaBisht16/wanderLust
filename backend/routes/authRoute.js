const express=require('express')
const router=express.Router()
const {signupUser,loginUser}=require('../controller/authController')
const passport=require('passport')


router.post('/signup',signupUser)
router.post('/login', loginUser)

module.exports=router;