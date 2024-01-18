'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ListingHead from '@/app/components/listings/ListingHead'
import Container from '@/app/components/Container'
import { SafeListing, SafeUser, SafeReservations } from '@/app/components/types'
import ListingInfo from '@/app/components/listings/ListingInfo'
import ListingReservation from '@/app/components/listings/ListingReservation'
import { Range } from 'react-date-range';
import useLoginModal from '@/app/hook/useLoginModal'
import { useRouter } from 'next/navigation'
import ClientOnly from '@/app/components/ClientOnly'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import axios from 'axios'
import toast from 'react-hot-toast'
import ListingLike from '@/app/components/listings/ListingLike'


const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface listingProps {
    listing?: SafeListing | null;
    currentUser?: SafeUser | null;
    reservations?: SafeReservations[];
    allUser?: any
}

const ListingSinglePage: React.FC<listingProps> = ({ listing, currentUser, reservations, allUser }) => {


    const LoginModal = useLoginModal()

    const router = useRouter()

    const loginModal = useLoginModal()



    const [isLoading, setIsLoading] = useState(false)
    const [totalPrice, setTotalPrice] = useState(listing?.price)

    const [dateRange, setDateRange] = useState<Range>(initialDateRange)

    //? function create Reservation
    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }
        setIsLoading(true);
        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id


        })
            .then(() => {
                toast.success('Listing reserved!')
                setDateRange(initialDateRange)
                router.push('/trips')
            })
            .then(() => {
                router.refresh()
            })
            .catch(() => {
                toast.error('Something went wrong')
            })
            .finally(() => {
                setIsLoading(false)
            })

    }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal])



    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {

            // หา จำนวนวันที่จองทั้งหมด
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            );
            if (dayCount && listing?.price) {
                setTotalPrice(dayCount * listing.price)
            }
        }
    }, [dateRange, listing?.price])


    // ? create วันท่ี่จองไว้
    const disabledDates = useMemo(() => {
        let dates: Date[] = [];
        reservations?.forEach((reservation: any) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate),
            })

            dates = [...dates, ...range]
        });

        return dates
    }, [reservations])


    return (
        <ClientOnly>

            <Container>

                <div className="max-w-screen-lg mx-auto">
                    <div className="flex flex-col gap-10">
                        <ListingHead
                            listing={listing}
                            currentUser={currentUser}
                        />
                        <div className="flex  flex-col lg:flex-row gap-10">
                            <ListingInfo
                                listing={listing}
                                currentUser={currentUser}
                            />
                            <ListingReservation
                                totalPrice={totalPrice}
                                listing={listing}
                                currentUser={currentUser}
                                onChangeDate={(value) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />
                        </div>
                        <div className="flex flex-col gap-3 justify-between">
                            <div className="font-bold text-lg">
                                User Love this place
                            </div>
                            <div className="flex flex-col  gap-2">
                                {listing?.favoriteUserId.length !== 0 ?
                                    listing?.favoriteUserId.map((user) => (
                                        <ListingLike
                                            key={user}
                                            listing={user}
                                            currentUser={currentUser}
                                            allUser={allUser}
                                        />
                                    ))
                                    : 
                                    <div className='text-neutral-500  text-sm'>
                                        No User Liked
                                    </div>
                                    }

                            </div>
                        </div>


                    </div>
                </div>
            </Container>

        </ClientOnly>
    )
}

export default ListingSinglePage