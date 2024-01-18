import React from 'react'
import ClientOnly from '../components/ClientOnly'
import EmptyState from '../components/EmptyState'
import TripsClient from './TripsClient'
import getCurrentUser from '../action/getCurrentUser'
import getReservations from '../action/getReservations'
import GettingUser from '../action/getUsers'
const page = async () => {

    const currentUser = await getCurrentUser()

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


    const reservations = await getReservations({
        userId: currentUser.id
    })

    const allUser = await GettingUser()



    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title='No trips found'
                    subtitle="Looks like you haven't reserved any trips."
                    tripbtn
                />
            </ClientOnly>
        )
    }


    return (
        <ClientOnly>
            <TripsClient
                reservations={reservations}
                currentUser={currentUser}
                allUser={allUser}
            />
        </ClientOnly>
    )
}

export default page