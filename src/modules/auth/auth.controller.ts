import { NextFunction, Request, Response } from "express"
import { authService } from "./auth.service"
import httpStatus from "http-status"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"

const registerUserController = catchAsync(

    async (req: Request, res: Response, next: NextFunction) => {
        const payload = req.body
        const result = await authService.registerUserService(payload)
        sendResponse(res, { success: true, statusCode: httpStatus.CREATED, message: 'User registered successfully', data: result })
    }

)







export const authController = {
    registerUserController
}