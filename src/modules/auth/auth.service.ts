import bcrypt from "bcryptjs"
import { prisma } from "../../lib/prisma"
import { RegisterUser } from "../user/user.interface"
import jwt, { SignOptions } from 'jsonwebtoken'
import config from "../../config"
import { jwtCreateToken } from "../../utils/jwt"

const registerUserService = async(payload : RegisterUser) =>{

    const {name,email,phone_no,password} = payload

    const isExisted = await prisma.user.findUnique({
        where:{
            email
        }
    })

    if(isExisted){
        throw new Error('User already exist')
    }
    
    const hashPassword = await bcrypt.hash(password,10)

    const created_user = await prisma.user.create({
        data:{
            name,
            email,
            phone_no,
            password : hashPassword
        }
    })

    const user = await prisma.user.findUnique({
        where:{
            id:created_user.id,
            email:created_user.email
        },
        omit:{
            password:true
        }
    })
    return user
}



const loginUserService = async(payload : any) =>{
    const {email,password} = payload
    const user = await prisma.user.findUniqueOrThrow({
        where:{
            email
        }
    })
    const isPasswordMatched = await bcrypt.compare(password,user.password)

    if(!isPasswordMatched) {
        throw new Error('Invalid credential')
    }

    const jwtPayload = {
        id:user.id,
        name:user.name,
        email : user.email,
        phone_no : user.phone_no, 
        role : user.role
    }

    const accessToken = jwtCreateToken(jwtPayload,config.access_secret,config.access_timeline as SignOptions)
    const refreshToken = jwtCreateToken(jwtPayload,config.refresh_secret,config.refresh_timeline as SignOptions)
    
    return {
        accessToken,
        refreshToken
    }

}

export const authService = {
    registerUserService,
    loginUserService
}