import { NextResponse } from "next/server";
import getCurrentUser from "@/app/action/getCurrentUser";
import prisma from '@/app/libs/prismadb'

interface IParams {
    reservationId?: string;

}
export async function DELETE(request: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.error()
    }

    const { reservationId } = params


    if (!reservationId || typeof reservationId !== 'string') {
        throw new Error('Invalid ID')
    }

    const resevationAdd = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            // คนที่เป็นคนสร้างสถานที่ หรือ คนที่จองสถานที่ สามารถลบได้
            OR: [
                { userId: currentUser.id },
                { listing: { userId: currentUser.id } }
            ]

        }
    })

    return NextResponse.json(resevationAdd)
}