const Listing=require('../models/listingModel')

const showindividualListing=async(req,res)=>{
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
        error_value:error
    })
}
}

module.exports=showindividualListing;