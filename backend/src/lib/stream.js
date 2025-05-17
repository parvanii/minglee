import {StreamChat} from "stream-chat"
import"dotenv/config"

const apiKey=process.env.STREAM_API_KEY
const apiSecret=process.env.STREAM_API_SECRET

if(!apiKey|| !apiSecret){
    console.error("Stream API key or secret is missing")
}

const StreamClient= StreamChat.getInstance(apiKey,apiSecret);


//update user if they exist, insert if they don't
export const upsertStreamUser= async(userData)=>{
    try{
    await StreamClient.upsertUsers([userData])
    return userData
    }
    catch(error){
    console.error("error upserting Stream user:",error)
    }
}