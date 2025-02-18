import { Router } from 'express';
import { getUserById, getUsers, updateUser } from "./user.controller.js"
import { getUserByIdValidator, adminUpdateUserValidator, updateUserValidator } from "../middlewares/user-validators.js"

const router = Router()

router.get("/findUser/:uid", getUserByIdValidator, getUserById)

router.get("/", getUsers)

router.put("/updateUser/:uid", adminUpdateUserValidator, updateUser)

router.put("/updateUser", updateUserValidator, updateUser)

export default router