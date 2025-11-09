const {validategoogletoken}=require('../middleware/validateGoogleToken')
const {genrateJwtToken}=require('../utils/genrateToken')
const User=require('../models/userModel')


const googleloginservice = async (token) => {
  try {
    const userInfo = await validategoogletoken(token);

    if (!userInfo || !userInfo.email) {
      return { result: 0, result_value: "Invalid Google token data" };
    }

    
    let user = await User.findOne({ $or: [{ email: userInfo.email }, { googleId: userInfo.sub }] });

    if (!user) {
        user = await User.create({
      username: userInfo.name,
      email: userInfo.email,
      password: userInfo.sub, 
      profileImage: userInfo.picture || "",
      googleId: userInfo.sub, 
      authProvider: "google",
    });
         
    }
     else {
      user.googleId = userInfo.sub;
      user.displayName = userInfo.name;
    }
        await user.save().catch((err) => {
});
  

     const usertoken = await genrateJwtToken(userInfo.email)
    

    return { result: 1, result_value: usertoken,curruser:user };

  } catch (error) {
    console.error("Error in googleloginservice:", error.message);
    return { result: 0, error_value: error.message };
  }
};



module.exports={googleloginservice}