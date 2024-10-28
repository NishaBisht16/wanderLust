const mongoose = require("mongoose");

const connectToDb = async () => {
    try {
        const connectDb = await mongoose.connect(process.env.MONGO_DB_URL, {
           
        });
        console.log(`MongoDB Connected: ${connectDb.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectToDb;
