const User=require('../models/userModel')

const signupUser=async(req,res)=>{
    try{
        const {username,email,password}=req.body
    const newUser=new User({username,email})
    const registeredUser=await User.register(newUser,password)
    res.send({
        result:1,
        message:"Signup Successfully"
    })
 
    }
    catch(error)
    {
        res.send({
            message:error.message
        })
    }

}

module.exports=signupUser;