const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
      username:String,
      email:{
        type:String,
        required: true,
        unique: true,

      },
      password:String,
       profileImage: String,
      googleId: String, 
      authProvider: String,
      resetPasswordToken: { type: String },
       resetPasswordExpires: { type: Date }

})

module.exports=mongoose.model("User",userSchema)