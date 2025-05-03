const Listing=require('../models/listingModel')
const User=require('../models/userModel')

const showindividualListing=async(req,res)=>{
    const {id}=req.params;
    
    try{
        if(Listing.length>0)
        {
        const data=await Listing.findById({_id:id})
        const owner=await User.findById({_id:data.owner})
        
        res.send({
            result:1,
            result_value:data,
            owner:owner
            
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
    console.log("error",error.message)
    res.send({
        result:0,
        error_value:error
    })
}
}

module.exports=showindividualListing;