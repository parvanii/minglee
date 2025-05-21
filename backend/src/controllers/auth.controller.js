import User from "../models/user.js";
import { upsertStreamUser } from "../lib/stream.js";
import jwt from "jsonwebtoken";

export async function signup(req,res){
    const{fullName,email,password}=req.body;
   try {

    //if any field missing
    if(!email||!password||!fullName){
        return res.status(400).json({message:"all fields are required"});
    }
    //if length of password is less than min length(6)
    if(password.length<6){
    return res.status(400).json({message:"Password must be atleast 6 characters"});
    }
    //if email provided is in invalid format
    const emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email)){
        return res.status(400).json({message:"Invalid email format"}); 
    }

    //if user already exists
 const existingUser= await User.findOne({email});
  if(existingUser){
   return res.status(400).json({message:"Email already in use,please use a different one"});
  }

  //generating avatar
  const index= Math.floor(Math.random()*100)+1;
  const randAvatar= `https://avatar.iran.liara.run/public/${index}.png`;
 

  const newUser= await User.create({
    fullName,
    email,
    password,
    profilePic:randAvatar
   }) ;
  
   

   // creating user in stream as well
   try{
   await upsertStreamUser({
    id:newUser._id.toString(),
    name:newUser.fullName,
    image:newUser.profilePic||"",
   });
   console.log(`stream user created for${newUser.fullName}`);
   
} 


catch(error){
    console.log("error creating Stream user",error)
}

   const token=jwt.sign({userId:newUser._id},
    process.env.JWT_SECRET_KEY,{
        expiresIn:"7d"
    })

    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,// 7 days in miliseconds
        httpOnly:true,//prevents XSS attacks
        SameSite:"strict",//prevents csrf attacks
        secure:process.env.NODE_ENV==="production"

    })

    res.status(201).json({ success: true, user: newUser });

   } catch (error) {
    console.log("error in signup",error)
    res.status(500).json({message:"Internal Server Error"});
   }
}

export async function login(req,res){
    try {
        //if fields are missing
       const{email,password} =req.body;
       if(!email||!password){
       return res.status(400).json({message:"All fields are required"})
       }
       //invalid credentials email
        const user= await User.findOne({email});
        if(!user){
        return res.status(404).json({message:"invalid password or email"})
  }
       //invalid credentials password
        const isPasswordCorrect= await user.matchPassword(password)
        if(!isPasswordCorrect) return res.status(401).json({message:"Invalid email or password"})

        const token=jwt.sign({userId:user._id},
        process.env.JWT_SECRET_KEY,{
            expiresIn:"7d"
        })
    
        res.cookie("jwt",token,{
            maxAge:7*24*60*60*1000,// 7 days in miliseconds
            httpOnly:true,//prevents XSS attacks
            SameSite:"strict",//prevents csrf attacks
            secure:process.env.NODE_ENV==="production"
    
        });
        res.status(200).json({success:true,user})

    } catch (error) {
        console.log("error in login",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}

export  function logout(req,res){
    res.clearCookie("jwt")
    return res.status(200).json({success:true,message:"Logout successful"})

}

export async function setup(req,res){
    try {
        const userId=req.user._id
        const{fullName,bio,fluentIn,currLearning,location}=req.body

        if (!fullName || !bio || !fluentIn || !currLearning || !location) {
            return res.status(400).json({
              message: "All fields are required",
              missingFields: [
                !fullName && "fullName",
                !bio && "bio",
                !fluentIn&& "fluentIn",
                !currLearning&& "currLearning",
                !location && "location",
              ].filter(Boolean),
            });
          }
          const updatedUser = await User.findByIdAndUpdate(
            userId,
            { ...req.body, isSetupComplete: true },
            { new: true } 
          );

    if(!updatedUser) return res.status(404).json({message:"User not found"})

        //updating user in Stream
        try {
            await upsertStreamUser({
              id: updatedUser._id.toString(),
              name: updatedUser.fullName,
              image: updatedUser.profilePic || "",
            });
            console.log(`Stream user updated after onboarding for ${updatedUser.fullName}`);
            
          } catch (streamError) {
            console.log("Error updating Stream user during onboarding:", streamError.message);
          }
      

        res.status(200).json({success:true,user:updatedUser})


    } catch (error) {
        console.error("Profile Setup error",error)
        res.status(500).json({
            message:"Internal server error"
        });
    }
}