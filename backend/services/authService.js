const User=require('../models/userModel')
const bcrypt=require('bcrypt')
const crypto=require('crypto')
const {genrateJwtToken}=require('../utils/genrateToken')
const {sendMail}=require('../utils/sendMail')
const { default: mongoose } = require('mongoose')
const signupUserService=async({username,email,password})=>{
    try{

        if(!username || !email  || !password)
        {
            return ({success:false, message:"All fields are required"})
        }

        const existedUser=await User.findOne({email})
        if(existedUser)
        {
            return ({success:false, message:"User already existed"})
        }
        const hashedPassword=await bcrypt.hash(password,10) 

        const newUser=await User.create({
            username:username,
            email:email,
            password:hashedPassword,
            authprovider:"basic"

        })
     
     return({success:true, message:"Signup Successfull", newUser})
        

    }

    catch(error)
    {
        return ({success:false,message:error.message})
       
    }
}

const loginUserService=async({email,password})=>{
    try{
        if(!email || !password)
        {
            return ({success:false, message:"Email & Password are required"})
        }

        const user=await User.findOne({email})
    
        
        if(!user){
            return({success:false,email_error:"Email does not exist"})
        }
        const isPassword=await bcrypt.compare(password,user.password)
        if(!isPassword)
        {
            return({success:false,password_error:"Incorrect password"})
        }
    
        
         const token=await genrateJwtToken(email)
         if(token)
         {
            return ({success:true, token:token, user:user,message:"Login Successfull"})
         }

         return({success:false, message:"User does not exists"})  

    }
    catch(error)
    {
        return ({success:false, message:error.message})

    }

}


const forgotPasswordService=async(email)=>{
 
    try{

        const user=await User.findOne({email})
        
        if(!user)
        {
            return({success:false,message:"User does not exists"})
        }

        const token=await crypto.randomBytes(32).toString('hex')
        await User.findByIdAndUpdate(user._id,{
            resetPasswordToken:token,
            resetPasswordExpires:Date.now() + 3600000

        })
             
        if(user.resetPasswordToken)
        {
            return ({success:true, message:'Email already sent, kindly check your mail it will be valid upto 1 hour'})
        }

       await sendMail(
        email,
      'Password Reset Request',
      `Reset your password: ${process.env.FRONTEND_URL}/resetpassword/${token}`
      ).catch(() => {
    throw new Error('Failed to send reset email. Please try again.');
  });


  return ({success:true, message:"Password reset email sent successfully,Kindly check your mail."})


    }catch(error)
    {
        return ({success:false, message:error.message})

    }
}

const resetpasswordService=async({token,newpassword,confirmPassword})=>{
    try{
         
        if(newpassword !==confirmPassword)
        {
            return({success:false, message:"Password does not match"})
        }

       const user =await User.findOne({
        resetPasswordToken:token,
        resetPasswordExpires:{$gt:Date.now()}
       })
   
       if(!user) return ({success:false,message:"Invalid or Expired reset token "})

          await User.findByIdAndUpdate(user._id,{
             password:await bcrypt.hash(newpassword,10),
              resetPasswordToken:undefined,
               resetPasswordExpires:undefined
        })
           
        return ({success:true, message:"Password reset successfull"})



    }catch(error)
    {
        return ({success:false, message:error.message})

    }

}
module.exports={signupUserService,loginUserService,forgotPasswordService,resetpasswordService}