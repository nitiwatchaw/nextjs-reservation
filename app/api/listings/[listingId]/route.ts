import { NextResponse } from "next/server";
import getCurrentUser from "@/app/action/getCurrentUser";
import prisma from '@/app/libs/prismadb'


interface IParams {
    listingId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {

    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return NextResponse.error()
    }

    const { listingId } = params;


    if (!listingId || typeof listingId !== "string") {
        throw new Error('Invalid Id')
    }

    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id
        }
    });

    return NextResponse.json(listing);


}


export async function PUT(request: Request, { params }: { params: IParams }) {


    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return NextResponse.error()
    }
    const { listingId } = params;


    const body = await request.json()

    const { title, description, imageSrc, category, roomCount, bathroomCount, guestCount, location, price } = body;

    Object.keys(body).forEach((value: any) => {

        // ถ้ามีตัวไหนที่ไม่ได้ใส่ จะให้ error
        if (!body[value]) {
            NextResponse.error()
        }
    });


    if (!listingId || typeof listingId !== "string") {
        throw new Error('Invalid Id')
    }

    const updatedListing = await prisma.listing.updateMany({
        where: {
            id: listingId,
        },
        data: {
            title: title,
            description: description,
            imageSrc: imageSrc,
            locationValue: location.value,
            category: category,
            roomCount: roomCount,
            bathroomCount: bathroomCount,
            guestCount: guestCount,
            price: parseInt(price, 10),

            // Add more fields to update if needed
        },
    });

    return NextResponse.json({ updatedListing });
}