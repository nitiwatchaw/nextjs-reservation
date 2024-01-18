import React from 'react';
import Container from './components/Container';
import getListing, { IListingsParams } from './action/getListing';
import getCurrentUser from './action/getCurrentUser';
import ClientOnly from "./components/ClientOnly";
import EmptyState from './components/EmptyState';
import ListingCard from './components/listings/ListingCard';
import GettingUser from '@/app/action/getUsers';
import { Suspense } from 'react';
import SkeletionSingleLoader from './components/SkeletionSingleLoader';


interface HomeProps {
  searchParams: IListingsParams;
}



export default async function Home({ searchParams }: HomeProps) {
  const listings = await getListing(searchParams);
  const currentUser = await getCurrentUser();
  const allUser = await GettingUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }



  return (
    <ClientOnly>
      <Container>
        <div className="">
          {listings.length} Places Found
        </div>
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 3xl:grid-6 gap-8">
          {listings.map((listing: any) => {
            return (
              <Suspense key={listing.id} fallback={<SkeletionSingleLoader />}>
                <ListingCard
                  data={listing}
                  currentUser={currentUser}
                  allUser={allUser}
                />
              </Suspense>

            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
}
