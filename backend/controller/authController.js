const User=require('../models/userModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const secretKey="@#$#@%$^RGERGD"
const signupUser=async(req,res)=>{
    try{
        const {username,email,password}=req.body
        const hashedPassword = await bcrypt.hash(password, 10);

         const newUser=new User({
             username:username,
             email:email,
             password:hashedPassword
         })

        await newUser.save()

    res.send({
        result:1,
        message:"Signup Successfully"
    })
 
    }
    catch (error) {
   
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0]; 
            const value = error.keyValue[field]; 

            res.status(400).send({
                message: `The ${field} '${value}' is already taken. Please choose a different ${field}.`
            });
        } else {
            // Handle other types of errors
            res.status(500).send({
                message: error.message
            });
        }
     }

}

const loginUser=async(req,res)=>{
     try{
        const {username,password}=req.body
        const user=await User.findOne({username})
        
        if (!user) {
            
            return res.status(400).json({ result: 0, username_error: "username does not exist." });

        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ result: 0, Password_error: "Incorrect password." });
        }

        const token = jwt.sign({user}, secretKey, { expiresIn: "24h" });
        res.send({
            result:1,
            message:"Login successfull",
            token:token,
            curruser:user
        })

      console.log(req.user)  
}
     catch(error)
     {

     }
}

module.exports={signupUser,loginUser};