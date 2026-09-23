import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router()

router.post('/register',authController.registerUserController)
router.post('/login',authController.loginUserController)



export const authRoute = router