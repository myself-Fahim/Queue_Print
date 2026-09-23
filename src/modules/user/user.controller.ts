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

export const userController = {
    myProfile
}