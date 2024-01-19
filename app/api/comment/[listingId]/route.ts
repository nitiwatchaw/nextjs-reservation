import { NextResponse } from "next/server";
import getCurrentUser from "@/app/action/getCurrentUser";
import prisma from '@/app/libs/prismadb'


interface IParams {
    listingId: string;
    commentId: string;
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



export async function DELETE(request: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }


    const { listingId } = params;


    try {
        const delComment = await prisma.comment.delete({
            where: {
                id: listingId
            }
        });

        return NextResponse.json(delComment);
    } catch (error) {
        console.error("Error deleting comment:", error);
        return NextResponse.error();
    }

}