import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { myFriends, getRecs ,sendfriendRequest,acceptfriendRequest} from "../controllers/user.controller.js";


const router= express.Router();

//applying auth to all 
router.use(protectRoute)


router.get("/",getRecs)
router.get("/friends",myFriends)
router.post("/friendRequest/:id",sendfriendRequest)
router.put("/friendRequest/:id/accept",acceptfriendRequest) //put as we are updating something


export default router;