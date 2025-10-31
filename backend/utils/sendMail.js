const nodemailer=require('nodemailer')

const transporter=nodemailer.createTransport({
    host:"smtp.gmail.com",
    secure:false,
    auth:{
        user:process.env.AUTH_EMAIL,
        pass:process.env.AUTH_PASS
    }
})
async function sendMail(to,subject,text,html) {
 

  const info = await transporter.sendMail({
    from: process.env.AUTHEMAIL,  //sender email
    to ,
    subject,
    text, 
    html, 
  });
}

module.exports={sendMail}