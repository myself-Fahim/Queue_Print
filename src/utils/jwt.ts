import { JwtPayload, SignOptions } from "jsonwebtoken";
import jwt from 'jsonwebtoken'

export const jwtCreateToken = (payload: JwtPayload, secret: string, timeline: SignOptions) => {
    const token = jwt.sign(payload, secret, { expiresIn: timeline } as SignOptions)
    return token
}

export const jwtVerifyToken = (token: string, secret: string)=>{
    try {
        const verify = jwt.verify(token, secret)
        return {
            success : true,
            data : verify
            
        }
    }
    catch (error : any) {
        return {
            success : false,
            error : error.message
        }
    }
}