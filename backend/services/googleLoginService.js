const {validategoogletoken}=require('../middleware/validateGoogleToken')
const {genrateJwtToken}=require('../utils/genrateToken')
const User=require('../models/userModel')


const googleloginservice = async (token) => {
  try {
    const userInfo = await validategoogletoken(token);

    if (!userInfo || !userInfo.email) {
      return { result: 0, result_value: "Invalid Google token data" };
    }

    
    let user = await User.findOne({ email: userInfo.email });

    if (user) {
      return { result: 1, result_value: "User login successful", user };
    }

  
    user = await User.create({
      username: userInfo.name,
      email: userInfo.email,
      password: userInfo.sub, 
      profileImage: userInfo.picture || "",
      googleId: userInfo.sub, 
      authProvider: "google",
    });

     const usertoken = await genrateJwtToken(userInfo.email)
    

    return { result: 1, result_value: usertoken };

  } catch (error) {
    console.error("Error in googleloginservice:", error.message);
    return { result: 0, error_value: error.message };
  }
};



module.exports={googleloginservice}