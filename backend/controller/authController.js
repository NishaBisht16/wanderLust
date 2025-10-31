
const {googleloginservice}=require('../services/googleLoginService')
const {signupUserService,loginUserService,forgotPasswordService,resetpasswordService}=require('../services/authService')

const signupUser = async (req, res) => {
  try {

    const { username, email, password } = req.body;

    const response=await signupUserService({username,email,password})

    if(response.success)
    {
      res.status(200).json({
        result:1,
        message:response.message,
        user:response.newUser

      })
    }
    else{
      res.status(400).json({
        result:0,
        message:response.message

      })
    }

  } catch (error) {
     res.status(500).json({result:0,message:error.message})
  }
};

const loginUser=async(req,res)=>{
     try{
        const {email,password}=req.body
        console.log(req.body)
        const response=await loginUserService({email,password})

        if(response.success)
        {
          res.status(200).json({
            result:1,
            message:response.message,
            token:response.token,
            curruser:response.user


          })
        }
        else{
          res.status(400).json({
            result:0,
          message: response.message || null,
        email_error: response.email_error || null,
        password_error: response.password_error || null,


          })
        }
     }
     catch(error)
     {
        res.status(500).json({
          result:0,
          message:error.message
        })

     }
}



const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        result: 0,
        result_value: "Google token is missing",
      });
    }

    const response = await googleloginservice(token);

    if (response.result === 1) {
      return res.status(200).json({
        result: 1,
        result_value: response.result_value,
      });
    } else {
      return res.status(400).json({
        result: 0,
        result_value: response.result_value,
      });
    }
  } catch (error) {
    console.error("Google login controller error:", error.message);
    return res.status(500).json({
      result: 0,
      result_value: "Server error during Google login",
      error_value: error.message,
    });
  }
};

const forgotpassword=async(req,res)=>{
  try{
    const {email}=req.body;
    console.log(email)

    const response=await forgotPasswordService(email)
    if(response.success){
      res.status(200).json({
        result:1,
        message:response.message,

      }) 
    }
    else{
      res.status(400).json({
        result:0,
        message:response.message
      })
    }

  }catch(error)
  {
    return res.status(500).json({result:0, message:error.message})

  }
}


const resetPassword=async(req,res)=>{
  try{
    const {token,newpassword,confirmPassword}=req.body
    const response= await resetpasswordService({token,newpassword,confirmPassword})

    if(response.success){
      res.status(200).json({
        result:1,
        message:response.message
      })
    }
    else{
      res.status(400).json({
        result:0,
        message:response.message
      })
    }

  }catch(error)
  {
    res.status(500).json({
      result:0,
      message:error.message
    })

  }
}


module.exports={signupUser,loginUser,googleLogin,forgotpassword,resetPassword};