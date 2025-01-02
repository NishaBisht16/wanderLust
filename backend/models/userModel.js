const { required } = require('joi')
const mongoose=require('mongoose')
const mongooselocalpassport=require('passport-local-mongoose')

const userSchema=new mongoose.Schema({
      email:{
        type:String,
        required:true
      }
})

User.plugin(mongooselocalpassport)

module.exports=mongoose.model("User",userSchema)