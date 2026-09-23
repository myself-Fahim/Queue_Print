import { JwtPayload, SignOptions } from "jsonwebtoken"
import config from "../../config"
import { prisma } from "../../lib/prisma"
import { jwtCreateToken, jwtVerifyToken } from "../../utils/jwt"


const myProfile = async (id: string) => {

    const profile = await prisma.user.findUniqueOrThrow({
        where: {
            id
        },
        omit: { password: true }
    })
    return profile

}

const getNewAccessToken = (token: string) => {

    const verifyToken = jwtVerifyToken(token, config.refresh_secret)
    if (!verifyToken.success) {
        throw new Error(verifyToken.error || "Invalid user")
    }
    const { id, email, phone_no, role } = verifyToken as JwtPayload
    const payload = {
        id,
        email,
        phone_no,
        role
    }

    const access_token = jwtCreateToken(payload, config.access_secret, config.access_timeline as SignOptions)
    return {access_token}

}

export const userService = {
    myProfile,
    getNewAccessToken
}