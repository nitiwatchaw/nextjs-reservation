import prisma from '@/app/libs/prismadb';

interface IParams {
  listingId: string;
}

// Function to retrieve a listing by its ID
export default async function getListingById(params: IParams) {
  try {
    const { listingId } = params;

    // Check if the listingId is provided
    if (!listingId) {
      throw new Error('Listing ID is required.');
    }

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      // เอาUser มาด้วย
      include: {
        user: true,
      },
    });

    // Check if the listing was not found
    if (!listing) {
      return null;
    }

    // Format timestamps to ISO strings
    const formattedListing = {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      },
    };

    return formattedListing;
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getListingById:', error);

    // Rethrow the error to maintain the original error message
    throw error;
  }
}
