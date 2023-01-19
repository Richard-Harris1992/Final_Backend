const mongoose = require('mongoose');
require('dotenv').config();

const mongooseURI = process.env.MONGO_URI;

const connectToMongoose = async () => {
    try {
        await mongoose.connect(mongooseURI, {useNewUrlParser: true});
        mongoose.set('strictQuery', false)
        console.log("MongDB Connected");
    } catch(err) {
        console.error(err.message);
        //Exit process with failure
        process.exit(1)
    }
}
module.exports = connectToMongoose;