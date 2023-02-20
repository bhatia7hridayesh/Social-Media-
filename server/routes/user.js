import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend
} from "../controllers/user.js";
import { verifytoken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", verifytoken, getUser);
router.get("/:id/friends", verifytoken, getUserFriends);

router.patch("/:id/:friendid", verifytoken, addRemoveFriend);

export default router;