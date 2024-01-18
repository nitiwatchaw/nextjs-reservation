'use client'
import React, { useMemo, useCallback } from 'react'
import { SafeListing, SafeReservations, SafeUser } from '../components/types'
import Image from 'next/image'
import useCountries from '../hook/useCountries'
import { format } from 'date-fns';
import { IoBedOutline } from "react-icons/io5";
import { LiaBathSolid } from "react-icons/lia";
import { BsPeople } from "react-icons/bs";
import Link from 'next/link'
import dynamic from 'next/dynamic'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
interface TripCardProps {
    reservation: SafeReservations | null & SafeListing
    currentUser: SafeUser | null | undefined;
    allUser: any
}



const TripCard: React.FC<TripCardProps> = ({ reservation, currentUser, allUser }) => {

    const router = useRouter();

    const { getByValue } = useCountries()

    const location = getByValue(reservation?.listing?.locationValue)


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
        <div className='bg-slate-50 p-6 flex flex-col gap-8'>
            <div className="grid grid-cols-1  xl:grid-cols-[400px_1fr_400px] items-center gap-8   rounded-sm  relative ">
                <Link href={`/listings/${reservation?.listingId}`} className="relative w-full h-[400px] xl:h-full rounded-lg shadow-xl p-3">
                    <Image
                        fill
                        alt='reservationImage'
                        src={reservation?.listing.imageSrc || ""}
                        className=' w-full h-full object-cover rounded-lg '
                    />
                </Link>
                <div className="flex flex-col gap-6 h-full ">
                    <div className="flex items-baseline text-sm gap-3 pt-3">
                        <div className="text-neutral-500 font-light">
                            {location?.region},
                        </div>
                        <div className="font-bold text-xl">
                            {location?.label}
                        </div>
                        <div className="font-bold text-xl text-primary">
                            /   ${reservation.listing.price}
                        </div>
                    </div>
                    <div className="flex-col gap-1 flex">
                        <div className="font-extrabold text-xl">
                            {reservation.listing.title}
                        </div>
                        <div className="text-neutral-500">
                            {reservation.listing.description}
                        </div>
                    </div>

                    <div className="flex gap-6 text-neutral-500  ">
                        <div className="flex items-cennter gap-2 ">
                            <IoBedOutline />
                            <div className="text-sm">
                                {reservation.listing.roomCount} bed
                            </div>
                        </div>
                        <div className="flex items-cennter  gap-2">
                            <LiaBathSolid />
                            <div className="text-sm">
                                {reservation.listing.bathroomCount} bath
                            </div>
                        </div>
                        <div className="flex items-cennter  gap-2">
                            <BsPeople />
                            <div className="text-sm">
                                {reservation.listing.guestCount} guest
                            </div>
                        </div>
                    </div>

                    <hr />
                    <div className="gap-6 flex flex-col justify-between ">
                        <div className="underline  underline-offset-4">
                            Personal Reservation
                        </div>
                        <div className="">
                            <div className="flex items-baseline gap-2">
                                <div className="text-sm text-neutral-500">
                                    From
                                </div>
                                <div className="text-lg !font-medium">
                                    {formattedStartDate}
                                </div>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <div className="text-sm text-neutral-500">
                                    To
                                </div>
                                <div className="text-lg !font-medium">
                                    {formattedEndDate}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 items-baseline">
                            <div className="text-sm text-neutral-500">
                                Total Price
                            </div>
                            <div className="font-bold text-lg">
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
                className="w-full text-white bg-rose-500 rounded-md h-8 z-50 flex items-center justify-center ">
                <div className="flex items-center gap-2">
                    Cancle Trips
                </div>
            </button>
        </div>
    )
}

export default TripCard