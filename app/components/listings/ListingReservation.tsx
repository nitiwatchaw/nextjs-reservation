import React from 'react'
import { SafeUser, SafeListing } from '../types';
import Calendar from '../input/Calenda';
import { Range } from 'react-date-range'

interface listingProps {
    listing?: SafeListing | null | any;
    currentUser?: SafeUser | null;
    onChangeDate: (value: Range) => void;
    dateRange: Range;
    disabled?: boolean;
    onSubmit: () => void;
    totalPrice: number | undefined;
    disabledDates: Date[]

}


const ListingReservation: React.FC<listingProps> = ({ listing, currentUser, onChangeDate, dateRange, onSubmit, disabled, totalPrice, disabledDates }) => {



    return (
        <div className='bg-neutral-100 p-5'>
            <div className="text-lg font-bold mb-6">
                ${listing.price} / night
            </div>
            <Calendar
                value={dateRange}
                disabledDates={disabledDates}
                onChange={(value) => onChangeDate(value.selection)}
            />
            <button
                disabled={disabled}
                onClick={onSubmit}
                className="w-full h-[40px] bg-primary my-3 text-white rounded-sm disabled:bg-primary/70 disabled:cursor-progress">
                Reservation Now
            </button>
            <div className="flex justify-between w-full mt-6 ">

                <div className="">Total</div>
                <div className="underline font-bold">$ {totalPrice}</div>
            </div>
        </div>
    )
}

export default ListingReservation