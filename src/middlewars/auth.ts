import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../utils/catchAsync"
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config"
import { prisma } from "../lib/prisma"
import { Role } from "../../generated/prisma/enums"
import { jwtVerifyToken } from "../utils/jwt"

export const auth = (...user_role:Role[]) => {
    
    return catchAsync(async (req: Request, res: Response, next:NextFunction) => {

        const token = req.cookies.accessToken ? req.cookies.accessToken :
            req.headers.authorization?.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : req.headers.authorization

        if (!token) {
            throw new Error('User not logged in')
        }
    

        const verifyToken = jwtVerifyToken(token,config.access_secret)

        if (!verifyToken.success) {
            throw new Error("Invalid user")
        }

        const { id, name, email, phone_no, role } = verifyToken.data as JwtPayload

        const user = await prisma.user.findUnique({
            where: {
                id,
                email
            }
        })

        if(!user){
            throw new Error("User not found")
        }

        if(user.status === 'BLOCKED'){
            throw new Error ("User is suspended , contact with support")
        }

        if(user_role.length && !user_role.includes(user.role)){
            throw new Error("Forbidden access")
        }

        req.user = {
            id,
            name,
            email,
            phone_no,
            role
        }

        next()
    })

}