import express from "express";
import {signup,login,logout,setup} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router= express.Router();

router.post("/signup",signup)

router.post("/logout",logout )
  

router.post("/login",login ) //post bcoz it updates something on the server side

router.post("/setup",protectRoute,setup)

//check if user is logged in
router.get("/me",protectRoute,(req,res)=>{
    res.status(200).json({success:true,user:req.user});
})

export default router;