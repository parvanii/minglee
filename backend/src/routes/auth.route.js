import express from "express";
import {signup,login,logout,setup} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router= express.Router();

router.post("/signup",signup)

router.post("/logout",logout )
  

router.post("/login",login )

router.post("/setup",protectRoute,setup)


export default router;