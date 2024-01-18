'use client'
import React from 'react'
import { SafeReservations, SafeUser } from '../components/types';

import Header from '../components/Header';
import TripCard from './TripCard';

interface TripsClientProps {
    reservations: SafeReservations[];
    currentUser?: SafeUser | null;
    allUser?: any | undefined
}

const TripsClient: React.FC<TripsClientProps> = ({ reservations, currentUser, allUser }) => {



    return (
        <div>
            <div className="">
                <Header
                    title='My Trips'
                    desc="Where you've been and where you're going"
                />

                <div className=" mt-9 flex flex-col gap-6 ">
                    {reservations.map((reservation) => (
                        <TripCard
                            key={reservation.id}
                            reservation={reservation}
                            currentUser={currentUser}
                            allUser={allUser}
                        />
                    ))}
                </div>
            </div>

        </div>
    )
}

export default TripsClient