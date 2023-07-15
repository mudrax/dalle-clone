import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

// used to pool our environment variables from dotEnv file
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json({limit : '50mb'}));

// make endpoints to connect frontend routes to backend
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);


app.get('/', async(req, res) => {
    res.send('Welcome to Dalle');
})

const startServer = async()=>{
    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(8080 , ()=>console.log('Server has started on port https://dall-e-clone-2sgx.onrender.com'))
    }
    catch(error){
        console.log(error);
    }
}

startServer();
