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

const loginUserController = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body
    const { accessToken, refreshToken } = await authService.loginUserService(payload)

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 2
    })
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 15
    })
    sendResponse(res, {
        success: true, message: 'User login successfully', statusCode: httpStatus.OK, data: {
            accessToken, refreshToken
        }
    })
})






export const authController = {
    registerUserController,
    loginUserController
}