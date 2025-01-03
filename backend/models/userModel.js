const mongoose=require('mongoose')
const mongooselocalpassport=require('passport-local-mongoose')

const userSchema=new mongoose.Schema({
      email:{
        type:String,
        required:true
      }
})

userSchema.plugin(mongooselocalpassport)

module.exports=mongoose.model("User",userSchema)