import { NextResponse } from "next/server";
import getCurrentUser from "@/app/action/getCurrentUser";
import prisma from '@/app/libs/prismadb'

interface Iparams {
  listingId?: string;
}

//? add fav funciton

export async function POST(request: Request, { params }: { params: Iparams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds.push(listingId);

  // Update user's favoriteIds
  const updatedUser = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds: favoriteIds,
    },
  });

  // Update listing's favoriteUserId
  const updatedListing = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      favoriteUserId: {
        push: currentUser.id,
      },
    },
  });

  return NextResponse.json({ user: updatedUser, listing: updatedListing });
}

// ? delete fav funciton
export async function DELETE(request: Request, { params }: { params: Iparams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
      return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
      throw new Error('Invalid ID');
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];
  let updatedUser; // Declare updatedUser here
  let updatedListing; // Declare updatedListing here

  try {
      // Remove listingId from favoriteIds array
      favoriteIds = favoriteIds.filter(id => id !== listingId);

      // Update user's favoriteIds
      updatedUser = await prisma.user.update({
          where: {
              id: currentUser.id,
          },
          data: {
              favoriteIds: favoriteIds,
          },
      });

      // Fetch the current state of the listing
      const currentListing = await prisma.listing.findUnique({
          where: {
              id: listingId,
          },
      });

      // Update listing's favoriteUserId, ensuring updatedListing is not undefined
      updatedListing = await prisma.listing.update({
          where: {
              id: listingId,
          },
          data: {
              favoriteUserId: {
                  set: currentListing?.favoriteUserId.filter(id => id !== currentUser.id) || [],
              },
          },
      });
  } catch (error) {
      // Handle errors here
      console.error('Error updating user and listing:', error);
      return NextResponse.error();
  }

  return NextResponse.json({ user: updatedUser, listing: updatedListing });
}