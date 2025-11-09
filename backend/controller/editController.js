const Listing=require('../models/listingModel')
const mongoose=require('mongoose')

const editListing=async(req,res)=>{
const {id}=req.params;
try{
    if(Listing.length>0)
        {
        const data=await Listing.findById({_id:id})

       let originalImageUrl=data.image.url
        originalImageUrl= originalImageUrl.replace('/upload',"/upload/h_300,w_350")
        res.send({
            result:1,
            result_value:{data,originalImageUrl}
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


const updateListing = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const { title, price, location, country } = req.body;

        const listing = await Listing.findByIdAndUpdate(
            id,
            { title, price, location, country },
            { new: true, runValidators: true }
        );

        if (!listing) {
            return res.status(404).json({ result: 0, message: "Listing not found" });
        }

        // Handle file upload
        if (req.file) {
            listing.image = {
                url: req.file.path,
                filename: req.file.filename
            };
            await listing.save();
        }


        return res.json({
            result: 1,
            result_value: listing,
            message: "Data updated successfully"
        });
    } catch (error) {
        return res.status(500).json({
            result: 0,
            message: error.message
        });
    }
};

module.exports={updateListing,editListing}