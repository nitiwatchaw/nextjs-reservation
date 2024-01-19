import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId: string;
}

export default async function getComment(params: IParams) {
    try {
        const { listingId } = params;


        if (!listingId) {
            throw new Error('Listing ID is required.');
        }

        const listingComments = await prisma.comment.findMany({
            where: {
                listing: {
                    id: listingId,
                },
            },
            include: {
                user: true,
            },
            orderBy:{
                createdAt:'desc'
            }
        });

        // Check if the comments were not found
        if (!listingComments || listingComments.length === 0) {
            return null;
        }

        return listingComments;
    } catch (error) {
        console.error('Error in getComment:', error);
        throw error;
    }
}
