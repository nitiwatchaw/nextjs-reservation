import React from 'react'
import Reservation from './ReservationClient'
import ClientOnly from '../components/ClientOnly'
import EmptyState from '../components/EmptyState'
import getCurrentUser from '../action/getCurrentUser'
import GettingUser from '../action/getUsers'
import getReservations from '../action/getReservations'
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

    const allUser = await GettingUser()

    const orderReservation = await getReservations({
        authorId: currentUser.id
    })

    if (orderReservation.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title='No your reservation order'
                    subtitle="Looks like there are no user for reservation you propertise."
                    addPropbtn
                />
            </ClientOnly>
        )
    }


    return (
        <ClientOnly>
            <Reservation
                currentUser={currentUser}
                allUser={allUser}
                orderReservation={orderReservation}
            />
        </ClientOnly>
    )
}

export default page