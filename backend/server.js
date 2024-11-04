const connectToDb=require('./config/db')
const express=require('express')
const dotenv = require('dotenv');
const Listing=require('./models/listing')
const app=express();
const cors=require('cors')
// const initDB=require('./init/index')
// initDB();
dotenv.config();
connectToDb();
app.use(cors())

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