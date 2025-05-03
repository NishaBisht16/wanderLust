const Listing=require('../models/listingModel')
const mongoose=require('mongoose')

const deleteListing=async(req,res)=>{
    const {id}=req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    try {
        const deleteData = await Listing.findByIdAndDelete(id);
          if(deleteData)
          {
            res.send({
                result:1,
                message:"Data deleted"
            })
            return;
          }
          else{
            res.send({
                result:0,
                message:"Something went wrong"
            })
            return;
          }
    } catch (error) {
        res.send({
            result:0,
            error_message:error

        })
    }
}

module.exports=deleteListing