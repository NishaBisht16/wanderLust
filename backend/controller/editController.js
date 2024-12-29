const Listing=require('../models/listingModel')
const mongoose=require('mongoose')

const editListing=async(req,res)=>{
const {id}=req.params;
try{
    if(Listing.length>0)
        {
        const data=await Listing.findById({_id:id})
        res.send({
            result:1,
            result_value:data
        })
        }
    else{
        res.send({
            result:0,
            error_value:'Data is not avaliable'
        })
    }
}
catch(error)
{
    res.send({
        result:0,
        error_value:error.message
    })
}
        
}

const updateListing=async(req,res)=>{
    try{
        const {id}=req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const {title,price,location,country,image}=req.body
        const updateData = await Listing.findByIdAndUpdate(
              id,
            { title:title, price:price, location:location, country:country ,image:image},
            { new: true }
        );

        res.send({
            result:1,
            message:"Data updated successfully"
        })
    }
    catch(error)
    {
        res.send({
            result:0,
            message:error.message
        })

    }
}

module.exports={updateListing,editListing}