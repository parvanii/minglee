import User from "../models/user.js";
import FriendRequest from "../models/FriendRequest.js";

export async function getRecs(req,res){
try {
    const currUserId =req.user._id;
    const currUser=req.user

    const Recs=  await User.find({
        $and:[
            {_id: {$ne: currUserId}},//excluding current user
            {_id: { $nin: currUser.friends }}, //exclude current user's friends
            {isSetupComplete:true}
        ]
    })
    res.status(200).json(Recs);

} catch (error) {
    console.error("Error in getRecs controller",error.message);
    res.status(500).json({message:"Internal server error"});
}
}

export async function myFriends(req,res){
try {
    const user= await User.findById(req.user.id)
    .select("friends")
    .populate("friends","fullName, profilePic, fluentIn,currLearning");
    res.status(200).json(user.friends)
} catch (error) {
    console.error("error in myFriends controller",error.message);
    res.status(500).json({message:"Internal Server Error"});
}
}

export async function sendfriendRequest(req,res){
    try {
        const myId=req.user._id;
        const{id:recipientId}=req.params //recipientid

        //prevent sending req to ourselves
         if(myId===recipientId) {
            return res.status(400).json({message:"you can't send friend request to yourself"})
         }

         const recipient= await User.findById(recipientId)

        if(!recipient){
            return res.status(404).json({message:"recipient not found"})
        }

        //if already friends
           if(recipient.friends.includes(myId)){
            return res.status(400).json({message:"You are already friends with this user"}) 
        }
      
        //if req already exists

        const existingRequest= await FriendRequest.findOne({
            $or:[
                {sender:myId,recipient:recipientId},
                {sender:recipientId,recipient:myId}
            ],
        });

        if(existingRequest){
            return res.status(400).json({message:"You have already sent request to this user"})   
        }

        const friendRequest= await FriendRequest.create({
            sender:myId,
            recipient:recipientId,
        });

        return res.status(201).json(friendRequest)   


    } catch (error) {
        console.error("Error in sendFriendRequest controller",error.mesage)
        res.status(500).json({message:"Internal server error"})

    }
}

export async function acceptfriendRequest(req,res){
    try {
        const {id:requestId}=req.params;

        const friendRequest=FriendRequest.findById(requestId);

        if(!friendRequest)
            {
                return res.status(404).json({message:"Friend request not found"}); 
            }
        //verify is current user is recepient
        if(friendRequest.recipient.toString()!=req.user._id){
            return res.staus(403).json({message:"You're not authorized to accept this requests"})
        }

        friendRequest.status="accepted";
        await friendRequest.save();

        //add each user to friend's array
        //$addToSet adds element only if they don't already exist
        await User.findByIdAndUpdate(friendRequest.sender,{
            $addToSet:{friends:friendRequest.recipient}
        });

        await User.findByIdAndUpdate(friendRequest.recipient,{
            $addToSet:{friends:friendRequest.sender}
        });

        res.staus(200).json({message:"friend request accepted"})

    } catch (error) {
        console.log("error in acceptFriendRequest controller",error.message);
        res.staus(500).json({message:"Internal server error"});
    }
}