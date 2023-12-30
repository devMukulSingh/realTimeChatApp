import {Router} from "express";
import { addUserController,
        checkUserController,
        generateTokenController,
        getUsersController } from "../controllers/authController.js";


const router = Router();

router.post("/check-user",checkUserController );
router.post("/add-user", addUserController );
router.get("/get-users", getUsersController);
router.get("/generate-token/:userId", generateTokenController);

export default router;