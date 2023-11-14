import {Router} from "express";
import { addUserController,
        checkUserController,
        getUsersController } from "../controllers/authController.js";


const router = Router();

router.post("/check-user",checkUserController );
router.post("/add-user", addUserController );
router.get("/get-users", getUsersController);

export default router;