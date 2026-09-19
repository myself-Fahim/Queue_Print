import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status"
import { sendResponse } from "./sendResponse";

export const catchAsync = (fn: RequestHandler) => {

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next)
        }
        catch (error) {
            sendResponse(res, { success: true, statusCode: httpStatus.INTERNAL_SERVER_ERROR, message: (error as Error).message || 'Failed to registered user' })
        }

    }

}