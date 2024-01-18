'use client'
import React from 'react'
import { SafeUser, SafeReservations, SafeListing } from '../components/types';
import ReservationCard from './ReservationCard';
import Header from '../components/Header';

interface ReservationProps {
  currentUser?: SafeUser | null;
  allUser?: any | undefined;
  orderReservation?: SafeReservations[] | undefined;
}

const Reservation: React.FC<ReservationProps> = ({ currentUser, allUser, orderReservation }) => {




  return (
    <div>

      <div className="">
        <Header
          title='Your reservation order from user'
          desc="The order of reservation that user want to trips on your propertise"
        />

        <div className=" mt-9 flex flex-col gap-6 ">
          {orderReservation?.map((reservation) => (
            <ReservationCard
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

export default Reservation