'use client'
import React, { useMemo, useCallback } from 'react'
import { SafeUser, SafeReservations, SafeListing } from '../components/types';
import { format } from 'date-fns'
import useCountries from '../hook/useCountries';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface ReservationProps {
    currentUser?: SafeUser | null;
    allUser?: any | undefined;
    reservation: SafeReservations | null & SafeListing;
}

const ReservationCard: React.FC<ReservationProps> = ({ currentUser, allUser, reservation }) => {



    const router = useRouter()
    const { getByValue } = useCountries()

    const location = getByValue(reservation?.listing?.locationValue)



    function getUserName(userId: string): string | null {
        const user = allUser?.find((user: SafeUser) => user.id === userId);
        return user ? user.name : null;
    }
    const userName = getUserName(reservation.userId);


    // Format start and end dates
    const formattedStartDate = format(new Date(reservation.startDate), 'EEEE, MM/dd/yyyy');
    const formattedEndDate = format(new Date(reservation.endDate), 'EEEE, MM/dd/yyyy');

    const Map = useMemo(() => dynamic(() => import('../components/Map'), {
        ssr: false
    }), [location])


    const cancelTrips = useCallback((reservationId: string) => {
        axios.delete(`/api/reservations/${reservationId}`)
            .then(() => {
                toast.success(`Resevation ${reservationId} is cancelled`)
                router.refresh()
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error)

            })

    }, [router])


    return (
        <div className='bg-slate-50 p-6 flex flex-col gap-8 dark:bg-[#373c5f] rounded-2xl'>
            <div className="grid grid-cols-1  xl:grid-cols-[400px_1fr_400px] items-center gap-8   rounded-sm  relative ">
                <Link href={`/listings/${reservation?.listingId}`} className="dark:border-[#888aa0] dark:border relative w-full h-[400px] xl:h-full rounded-lg shadow-xl p-3">
                    <Image
                        fill
                        alt='reservationImage'
                        src={reservation?.listing.imageSrc || ""}
                        className=' w-full h-full object-cover rounded-lg '
                    />
                </Link>
                <div className="flex flex-col gap-6 h-full  ">
                    <div className="flex items-baseline text-sm gap-3 pt-3">
                        <div className="text-neutral-500 font-light dark:text-[#888aa0]">
                            {location?.region},
                        </div>
                        <div className="font-bold text-xl dark:text-white">
                            {location?.label}
                        </div>
                        <div className="font-bold text-xl text-primary">
                            /   ${reservation.listing.price}
                        </div>
                    </div>
                    <div className="items-baseline gap-1 flex !capitalize">
                        <div className="dark:text-[#888aa0]">
                            From
                        </div>
                        <div className="text-lg font-bold dark:text-white">
                            {userName}
                        </div>
                    </div>

                    <hr className='dark:border-[#71778e]'/>
                    <div className="gap-6 flex flex-col justify-between ">
                        <div className="underline  underline-offset-4 dark:text-[#cfd0da] ">
                            Personal Reservation
                        </div>
                        <div className="">
                            <div className="flex items-baseline gap-2">
                                <div className="text-sm text-neutral-500 dark:text-[#cfd0da] ">
                                    From
                                </div>
                                <div className="text-lg !font-medium dark:text-white">
                                    {formattedStartDate}
                                </div>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <div className="text-sm text-neutral-500 dark:text-[#cfd0da] ">
                                    To
                                </div>
                                <div className="text-lg !font-medium dark:text-white">
                                    {formattedEndDate}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 items-baseline">
                            <div className="text-sm text-neutral-500 dark:text-[#cfd0da]">
                                Total Price
                            </div>
                            <div className="font-bold text-lg dark:text-white">
                                ${reservation.totalPrice}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 ">
                    <Map center={location?.latlng} />
                </div>

            </div>
            <button
                onClick={() => cancelTrips(reservation.id)}
                className="w-full text-white dark:bg-[#34977d] dark:text-black  bg-rose-500 rounded-md h-8 z-50 flex items-center justify-center ">
                <div className="flex items-center gap-2">
                    Cancle this trips
                </div>
            </button>
        </div>
    )
}

export default ReservationCard