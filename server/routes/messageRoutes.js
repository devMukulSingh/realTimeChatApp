import express from "express";
import { addMessageController } from "../controllers/messageController.js";

const router = express.Router();

router.post("/add-message",addMessageController);

export default router;