const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

console.log(process.env.CLOUD_NAME)
console.log(process.env.CLOUD_API_KEY)
console.log(process.env.CLOUD_API_SECRET)
cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.CLOUD_API_KEY,
  api_secret:process.env.CLOUD_API_SECRET

})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Wanderlust_DEV', // The name of the folder in
    allowedFormats: ["png","jpg","jpeg"],// supports promises as well
    public_id: (req, file) => 'computed-filename-using-request',
  },
});

  module.exports={cloudinary,storage}
   