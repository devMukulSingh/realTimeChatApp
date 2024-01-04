import express from "express";
import multer from "multer";
import { addImageMessageController, addMessageController, getMessageController } from "../controllers/messageController.js";

const router = express.Router();
const uploadImage = multer({ dest:'/uploads/images' });

router.post("/add-message",addMessageController);
router.get("/get-messages",getMessageController);
router.post("/add-image-message",uploadImage.single("image"), addImageMessageController);

export default router;