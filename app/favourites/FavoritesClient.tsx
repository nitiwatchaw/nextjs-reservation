import React from 'react'
import { SafeListing, SafeUser } from '../components/types';
import Header from '../components/Header';
import ListingCard from '../components/listings/ListingCard';

interface FavoritesClientProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null;
    allUser?: any;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({ listings, currentUser, allUser }) => {
    return (
        <div>
            <Header
                title='Favorites'
                desc='List of places you have favorited'
            />
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 3xl:grid-6 gap-8">
                {listings.map((listing) => (
                    <ListingCard
                        key={listing.id}
                        data={listing}
                        allUser={allUser}
                        currentUser={currentUser}

                    />
                ))}
            </div>
        </div>
    )
}

export default FavoritesClient