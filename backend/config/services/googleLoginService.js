import { validategoogletoken } from "../../middleware/validateGoogleToken.js"
const googleloginservice=async(token)=>{
    const {response}=validategoogletoken(token)
     console.log("response in service",response)

}

module.exports={googleloginservice}