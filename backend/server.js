const app=require('./app')
const PORT=process.env.PORT||8000
app.listen(PORT,()=>{
    console.log(`App is listing on port ${PORT}`)
})







// const connectToDb=require('./config/db')
// const express=require('express')
// const dotenv = require('dotenv');
// const Listing=require('./models/listingModel')
// const Review=require('./models/reviewModel')
// const app=express();
// const cors=require('cors');
// const { default: mongoose } = require('mongoose');
// const ExpressError=require('./utils/ExpressError')
// const {listingSchema}=require('./Schema')
// // const initDB=require('./init/index')
// // initDB();


// dotenv.config();
// connectToDb();
// app.use(cors())
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// app.get("/allListing",async(req,res)=>{
//     try{
//         const allListingData=await Listing.find()
//         if(allListingData.length>0)
//         {
//             res.send({
//                 result:1,
//                 result_value:allListingData
//             })

//         }
//         else{
//             res.send({
//                 result:0,
//                 error_value:"can not get the data"
//             })
//         }
//     }
//     catch(error){
//         res.send({
//             result:0,
//             error_value:error
//         })

//     }
// })

// app.get('/listing/:id',async(req,res)=>{
//     const {id}=req.params;
//     try{
//         if(Listing.length>0)
//         {
//         const data=await Listing.findById({_id:id})
//         res.send({
//             result:1,
//             result_value:data
//         })
//         }
//     else{
//         res.send({
//             result:0,
//             error_value:'Data is not avaliable'
//         })
//     }
//     }
// catch(error)
// {
//     res.send({
//         result:0,
//         error_value:error
//     })
// }
// })

// app.post('/create',async(req,res)=>{
        
        
//         if(validation.error)
//         {
//           return  res.status(400).json({ error: validation.error });

//         }
//         const {title,price,location,country,image}=req.body
//         const existedData=await Listing.find()
//        for(let i=0; i<existedData.length; i++)
//        {
//            if((title==existedData[i].title) && (price==existedData[i].price) &&(location==existedData[i].location)&& (country==existedData[i].country) &&(image==existedData[i].image))
//            {
//               res.send({
//                 result:0,
//                 message:"Data already existed!! Please create a new list"
//               })
//               return;
//            }
//        }
//         const newList=new Listing({
//             title:title,
//             price:price,
//             location:location,
//             country:country,
//             image:image
//         })


//     newList.save().then(()=>{
//         res.send({
//             result:1,
//             message:"Data saved successfully"
//         })

//     }).catch((err)=>{
//         res.send({
//             result:0,
//             message:err.message
//         })
//     })

    
// })


// app.get('/Edit/:id',async(req,res)=>{
//     const {id}=req.params;
//         if(Listing.length>0)
//         {
//         const data=await Listing.findById({_id:id})
//         res.send({
//             result:1,
//             result_value:data
//         })
//         }
//     else{
//         res.send({
//             result:0,
//             error_value:'Data is not avaliable'
//         })
//     }
     
// })

// app.put('/update/:id',async(req,res)=>{
//     try{
//         const {id}=req.params
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ error: "Invalid ID format" });
//         }

//         const {title,price,location,country,image}=req.body
//         const updateData = await Listing.findByIdAndUpdate(
//               id,
//             { title:title, price:price, location:location, country:country ,image:image},
//             { new: true }
//         );

//         if(updateData)
//         {
//             res.send({
//                 result:1,
//                 message:"Data updated successfully"
//             })
//         }
//         else{
//             res.send({
//                 result:0,
//                 message:"Data did not update"
//             })
//         }
//     }
//     catch(error)
//     {
//         res.send({
//             result:1,
//             message:error
//         })

//     }
// })

// app.delete('/delete/:id',async(req,res)=>{
 
//     const {id}=req.params;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(400).json({ error: "Invalid ID format" });
//     }

//     try {
//         const deleteData = await Listing.findByIdAndDelete(id);
//           if(deleteData)
//           {
//             res.send({
//                 result:1,
//                 message:"Data deleted"
//             })
//             return;
//           }
//           else{
//             res.send({
//                 result:0,
//                 message:"Data did not delete"
//             })
//             return;
//           }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// })

// app.post('/listings/:id/reviews',async(req,res)=>{
//     const {id}=req.params;
//     try{
//         let listings=await Listing.findById({_id:id})
//     const {rating,feedback}=req.body
//     const newReview=new Review({
//         comment:feedback,
//         rating:rating
//     })
//     listings.reviews.push(newReview)
//     await newReview.save()
//     await listings.save();

//     res.send({
//         result:1,
//         message:"New Review Saved"
//     })
//     }
//     catch(error)
//     {
//         res.send({
//             result:0,
//             message:error
//         })

//     }
    


// })

// app.all("/*",(req,res,next)=>{
//     next(new ExpressError(404,"Page Not Found"))
// })

// app.use((err,req,res,next)=>{
//     let (statusCode,message)=err;
//     res.status(statusCode).send(message)
// })

// //listing reves
