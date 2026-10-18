import { Router } from "express";
import { createUser } from "../controllers/usersController.js";
import { validateCreateUser } from "../validators/validateUser.js";

const router = Router();


router.post('/', validateCreateUser,createUser)

export default router;