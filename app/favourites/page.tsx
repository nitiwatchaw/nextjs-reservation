import React from 'react'
import EmptyState from '../components/EmptyState'
import ClientOnly from '../components/ClientOnly'
import getCurrentUser from '../action/getCurrentUser'
import getFavoritesListing from '../action/getFavouriteListing'
import FavoritesClient from './FavoritesClient'
import GettingUser from '../action/getUsers'
const page = async () => {

    const currentUser = await getCurrentUser()

    const favoritesListing = await getFavoritesListing()

    const allUser = await GettingUser()


    if (favoritesListing.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title='No favourites found'
                    subtitle='Looks like you have no favorite listings'
                />
            </ClientOnly>
        )

    }


    return (
        <ClientOnly>
            <FavoritesClient
                listings={favoritesListing}
                currentUser={currentUser}
                allUser={allUser}
            />
        </ClientOnly>
    )
}

export default page