const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
      username:String,
      email:{
        type:String,
        required: true,
        unique: true,

      },
      password:String,
    displayName: { type: String, required: true },
     googleId: { type: String, required: false },
      authProvider: String,
      resetPasswordToken: { type: String },
       resetPasswordExpires: { type: Date }

})

module.exports=mongoose.model("User",userSchema)