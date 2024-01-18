import prisma from "@/app/libs/prismadb";

export default async function GettingUser() {
    try {
        const allUser = await prisma.user.findMany()
        return allUser
    }
    catch (error) {
        console.log(error)
    }
}