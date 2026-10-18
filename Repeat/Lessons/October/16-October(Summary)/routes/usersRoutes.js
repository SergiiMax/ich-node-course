import { Router } from "express";
import { createUser, getUserById, getUsers, updateUserById } from "../controllers/usersController.js";
import { validateCreateUser } from "../validators/validateCreateUser.js";
import { validateObjectId } from "../validators/validateObjectId.js";
import { validateUpdateUser } from "../validators/validateUpdateUser.js";

const router = Router();


router.post('/', validateCreateUser,createUser)
router.get('/', getUsers)
router.get('/:id', validateObjectId, getUserById)
router.put('/:id', validateObjectId, validateUpdateUser, updateUserById)

export default router;