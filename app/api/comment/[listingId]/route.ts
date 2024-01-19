import { NextResponse } from "next/server";
import getCurrentUser from "@/app/action/getCurrentUser";
import prisma from '@/app/libs/prismadb'


interface IParams {
    listingId: string; // Change from string | undefined to string
}

export async function POST(request: Request, { params }: { params: IParams }) {


    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return NextResponse.error()
    }
    const { listingId } = params;

    const requestBody = await request.json();

    const { commentBody } = requestBody;

    const addComment = await prisma.comment.create({

        data: {
            listingId: listingId, // Assuming your Comment model has a 'listingId' field
            userId: currentUser.id,
            commentBody
        }
    })


    return NextResponse.json(addComment);


}