import React from 'react'
import PropertiesClient from './PropertiesClient'
import getCurrentUser from '../action/getCurrentUser'
import ClientOnly from '../components/ClientOnly'
import EmptyState from '../components/EmptyState'
import GettingUser from '../action/getUsers'
import { getListingFromCurrentUser } from '../action/getListing'
const page = async () => {

    const currentUser = await getCurrentUser()

    const allUser = await GettingUser();

    const listings = await getListingFromCurrentUser(currentUser || {})


    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title='Unauthorized'
                    subtitle='Please login'
                    
                />
            </ClientOnly>
        )
    }


    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title='No propertise found'
                    subtitle="Looks like you have no propertise."
                    center
                    addPropbtn
                />
            </ClientOnly>
        )
    }


    return (
        <ClientOnly>
            <PropertiesClient
                allUser={allUser}
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default page