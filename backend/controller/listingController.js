const Listing=require('../models/listingModel')

//Create Listing
const createListing=async(req,res)=>{
    

    const {title,price,location,country,image}=req.body
    const existedData=await Listing.find()
   for(let i=0; i<existedData.length; i++)
   {
       if((title==existedData[i].title) && (price==existedData[i].price) &&(location==existedData[i].location)&& (country==existedData[i].country) &&(image==existedData[i].image))
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
        image:image
    })


newList.save().then(()=>{
    res.send({
        result:1,
        message:"New Listing Created"
    })

}).catch((err)=>{
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


module.exports={createListing,getAllListing}