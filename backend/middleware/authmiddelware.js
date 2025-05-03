const jwt=require('jsonwebtoken')
const secretKey="@#$#@%$^RGERGD"

function verifyUser(req,res,next){
   const userToken = req.headers['authorization']; 

   const token = userToken.split(" ")[1];
   
    
   if (!token) {
       return res.status(401).json({ error: "Unauthorized" });
   }
   try {

       const decoded = jwt.verify(token, secretKey)
       req.user = decoded
       next();
   }
   catch (error) {
       res.status(401).json({ error: "Invalid token" })
   }
    
}

module.exports=verifyUser
