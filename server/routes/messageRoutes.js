import express from "express";
import { addMessageController, getMessageController } from "../controllers/messageController.js";

const router = express.Router();

router.post("/add-message",addMessageController);
router.post("/get-messages",getMessageController);

export default router;