import React from 'react'
import ListingSinglePage from './SingleListingPage'
import getCurrentUser from '@/app/action/getCurrentUser'
import getListingById from '@/app/action/getSingleListing'
import getReservations from '@/app/action/getReservations'
import SkeletionLoader2 from '@/app/components/SkeletionLoader2'
import { Suspense } from 'react'
import GettingUser from '@/app/action/getUsers'
import getComment from '@/app/action/getCommet'

interface IParams {
    listingId: string;
}


const page = async ({ params }: { params: IParams }) => {

    const currentUser = await getCurrentUser()
    const listing = await getListingById(params)
    const reservations = await getReservations(params)
    const allUser = await GettingUser()

    const commentData = await getComment(params)


    return (
        <div>
            <Suspense fallback={<SkeletionLoader2 />}>
                <ListingSinglePage
                    listing={listing}
                    currentUser={currentUser}
                    reservations={reservations}
                    allUser={allUser}
                    commentData={commentData}
                />
            </Suspense>

        </div>
    )
}

export default page