const Listing=require('../models/listingModel')
const multer=require('multer')
const {storage}=require('../config/cloudConfig')
const upload=multer({storage})

// Create Listing
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now()
//       cb(null, + uniqueSuffix + file.originalname)
//     }
//   })

  
// const upload = multer({ storage: storage })

const createListing=async(  req,res)=>{ 
     
      const path=req.file.path  
      const filename=req.file.filename
    const {title,price,location,country}=req.body
    const existedData=await Listing.find()


    
   for(let i=0; i<existedData.length; i++)
   {
       if((title==existedData[i].title) && (price==existedData[i].price) &&(location==existedData[i].location)&& (country==existedData[i].country))
       {
          res.send({
            result:0,
            message:"Data already existed!! Please create a new list"
          })
          return;
       }
   }
    const newList=new Listing({
        title:title,
        price:price,
        location:location,
        country:country,
        image:{
           url:path,
            filename:filename
        },
        owner:req.user.user._id

    })


newList.save().then(()=>{
    res.send({
        result:1,
        message:"New Listing Created"
    })

}).catch((err)=>{
    console.log("error",err)
    res.send({
        result:0,
        message:err.message
    })
})
}





const getAllListing=async(req,res)=>{
    try{

        const allListingData=await Listing.find()
        if(allListingData.length>0)
        {
            res.send({
                result:1,
                result_value:allListingData
            })

        }
        else{
            res.send({
                result:0,
                error_value:"can not get the data"
            })
        }
    }
    catch(error){
        res.send({
            result:0,
            error_value:error
        })

    }
}


module.exports={createListing,getAllListing,upload}