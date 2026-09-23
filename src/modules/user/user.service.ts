import { prisma } from "../../lib/prisma"

const myProfile = async (id: string) => {

    const profile = await prisma.user.findUniqueOrThrow({
        where: {
            id
        },
        omit: { password: true }
    })
    return profile


}

export const userService = {
    myProfile
}