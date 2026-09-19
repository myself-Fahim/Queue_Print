import bcrypt from "bcryptjs"
import { prisma } from "../../lib/prisma"
import { RegisterUser } from "../user/user.interface"

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

export const authService = {
    registerUserService
}