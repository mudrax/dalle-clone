import express from "express";
import * as dotenv from 'dotenv';
import {Configuration  , OpenAIApi} from 'openai';

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
    apiKey : process.env.OPENAI_API_KEY,
})

var openai = new OpenAIApi(configuration);

// The decision to use POST instead of GET :
// Request Payload: In this case, the prompt is sent in the request body rather than as query parameters in the URL.
// Security: Sending sensitive or private information in the request body is generally considered more secure 
// Idempotence: POST requests are not idempotent, meaning that multiple identical requests may have different effects. I

router.route('/').post(async(req , res)=>{
    try{
        const {prompt} = req.body;
        // console.log(prompt);
        const aiResponse = await openai.createImage({
            prompt , 
            n : 1 , 
            size : '256x256' , 
            response_format : 'b64_json' , 
        });

        // console.log(aiResponse);
        // const imageURL = aiResponse.data.data[0].url;
        // console.log("here is the url of image fetched by open ai" , imageURL);
        const image = aiResponse.data.data[0].b64_json;
        
        res.status(200).json({ photo : image });
    }
    catch(error){
        // console.log(error);
        res.status(500).send(error?.response.data.error.message);
    }
})

export default router;