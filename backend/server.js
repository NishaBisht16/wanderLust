const connectToDb=require('./config/db')
const express=require('express')
const dotenv = require('dotenv');
const Listing=require('./models/listing')
const app=express();
const cors=require('cors');
const { default: mongoose } = require('mongoose');
// const initDB=require('./init/index')
// initDB();
dotenv.config();
connectToDb();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get("/allListing",async(req,res)=>{
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
})

app.get('/listing/:id',async(req,res)=>{
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
})

app.post('/create',async(req,res)=>{
    try{
        const {title,price,location,country}=req.body
        const newList=new Listing({
            title:title,
            price:price,
            location:location,
            country:country
        })

    newList.save().then(()=>{
        res.send({
            result:1,
            message:"Data saved successfully"
        })

    }).catch(()=>{
        res.send({
            result:0,
            message:"Data did not save, Something went wrong!!"
        })
    })

    }catch(error){
        console.log("error",error)

    }
})


app.get('/Edit/:id',async(req,res)=>{
    const {id}=req.params;
        if(Listing.length>0)
        {
        const data=await Listing.findById({_id:id})
        res.send({
            result:1,
            result_value:{data}
        })
        }
    else{
        res.send({
            result:0,
            error_value:'Data is not avaliable'
        })
    }
     
})

app.put('/update/:id',async(req,res)=>{
    try{
        const {id}=req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const {title,price,location,country}=req.body
        const updateData = await Listing.findByIdAndUpdate(
              id,
            { title:title, price:price, location:location, country:country },
            { new: true }
        );

        if(updateData)
        {
            res.send({
                result:1,
                message:"Data updated successfully"
            })
        }
        else{
            res.send({
                result:0,
                message:"Data did not update"
            })
        }
    }
    catch(error)
    {
        res.send({
            result:1,
            message:error
        })

    }
})

