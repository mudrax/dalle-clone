import mongoose from "mongoose";

const connectDB = (url)=>{
    // useful in search functions
    mongoose.set('strictQuery' , true);

    // connect database
    mongoose.connect(url)
    .then(()=>console.log('mongodb connected'))
    .catch((err)=>console.log(err))
}

export default connectDB;