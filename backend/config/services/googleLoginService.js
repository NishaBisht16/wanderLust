import { validategoogletoken } from "../../middleware/validateGoogleToken.js"
const googleloginservice=async(token)=>{
    const {response}=validategoogletoken(token)

}

module.exports={googleloginservice}