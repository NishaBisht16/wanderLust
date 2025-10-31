const express=require('express')
const router=express.Router()
const {signupUser,loginUser,googleLogin,forgotpassword,resetPassword}=require('../controller/authController')
const passport=require('passport')


router.post('/signup',signupUser)
router.post('/login', loginUser)
router.post('/googlelogin',googleLogin)
router.post('/forgotpassword',forgotpassword)
router.post('/resetpassword',resetPassword)

module.exports=router;