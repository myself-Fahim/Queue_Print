import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { userService } from "./user.service"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from 'http-status'

const myProfile = catchAsync(async (req: Request, res: Response) => {

    const result = await userService.myProfile(req.user?.id as string)
    sendResponse(res, {
        success: true,
        message: "User profile retrieve successfully",
        statusCode: httpStatus.OK,
        data: result
    })

})


const getNewAccessToken = catchAsync(async (req: Request, res: Response) => {
    const refresh_token = req.cookies.refreshToken
    const { access_token } = await userService.getNewAccessToken(refresh_token)

    res.cookie('accessToken', access_token, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 2
    })

    sendResponse(res, {
        success: true,
        message: "Token retrieve successfully",
        statusCode: httpStatus.OK,
        data: {access_token}
    })

})

export const userController = {
    myProfile,
    getNewAccessToken
}