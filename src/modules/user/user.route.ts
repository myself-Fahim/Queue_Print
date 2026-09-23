import { Router } from "express";
import { userController } from "./user.controller";
import { auth } from "../../middlewars/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router()
router.get('/me',auth(Role.SHOP_OWNER,Role.ADMIN,Role.USER),userController.myProfile)


export const userRoute = router