const Listing=require('../models/listingModel')
const Review=require('../models/reviewModel')
const User=require('../models/userModel')


const createReview=async(req,res)=>{
    const {id}=req.params;
    try{
        
        let listings=await Listing.findById({_id:id})
        const {rating,feedback}=req.body
        const newReview=new Review({
        comment:feedback,
        rating:rating,
        author:req.user.user._id
    })
    listings.reviews.push(newReview)
    await newReview.save()
    await listings.save();

    res.send({
        result:1,
        message:"New Review Saved"
    })
    }
    catch(error)
    {
        res.send({
            result:0,
            error_value:error.message
        })

    }
}

const getReview=async(req,res)=>{
  
    const {id}=req.params
    try{
         
        const listingData=await Listing.findById({_id:id})
         
       
        const reviews=[]
    

            for(let i=0; i<listingData.reviews.length; i++)
        {
           
            const reviewsData=await Review.findById({_id:listingData.reviews[i]}) 
            reviews.push(reviewsData)
           
           
        }
        
        
       const auther=[]
        for(let i=0; i<reviews.length; i++)
        {
            
            const getAuthordata=await User.findById({_id:reviews[i].author})
            auther.push(getAuthordata)
           
        }
        
        if(reviews)
        {
            res.send({
            result:1,
            result_value:reviews,
            auther:auther

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

const deleteReview=async (req,res)=>{
   
    const {id,reviewId}=req.params;
      try{
      await Listing.findByIdAndUpdate(id,{$pull : {reviews:reviewId}})
      await Review.findByIdAndDelete({_id:reviewId})
      }
      catch(error){
           res.send({
            result:0,
            error_value:error.message
           })
      }
}

module.exports={createReview,getReview,deleteReview};