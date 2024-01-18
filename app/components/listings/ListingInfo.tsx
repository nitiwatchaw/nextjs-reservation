'use client'
import React, { useMemo } from 'react'
import { SafeUser, SafeListing } from '../types';
import { categories } from '../navbar/Category';
import Image from 'next/image';
import ListingCategory from './ListingCategory';
import useCountries from '@/app/hook/useCountries';
import dynamic from 'next/dynamic';

interface listingProps {
    listing?: SafeListing | null | any;
    currentUser?: SafeUser | null;

}


const ListingInfo: React.FC<listingProps> = ({ listing, currentUser }) => {


    const categoryMatch = categories.find(item => item.label === listing.category)

    const { getByValue } = useCountries();

    const MemoizedMap = useMemo(() => dynamic(() => import('../Map'), { ssr: false }), []);

    const coordinated = listing?.locationValue ? getByValue(listing.locationValue)?.latlng : undefined;

    return (
        <div className='flex flex-col gap-10 flex-1'>
            <div className="flex flex-col gap-2">
                <div className="flex gap-5 items-center">
                    <div className="capitalize font-semibold  text-lg">Hosted by {listing?.user?.name || 'Unknown User'}</div>
                    <div className="relative rounded-full w-10 h-10">
                        <Image
                            fill
                            alt='picture'
                            src={listing?.user?.imageProfile || listing?.user?.image || '/images/placeholder.jpg'}
                            className='w-full h-full object-cover rounded-full'
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4  ">
                    <div className="font-light text-md text-neutral-400">{listing?.guestCount} guests</div>
                    <div className="font-light text-md text-neutral-400">{listing?.roomCount} rooms</div>
                    <div className="font-light text-md text-neutral-400">{listing?.bathroomCount} barthrooms</div>
                </div>
            </div>

            <ListingCategory
                title={categoryMatch?.label}
                desc={categoryMatch?.description}
                icon={categoryMatch?.icon}
            />
            <div className='flex flex-col gap-6 !border-b border-neutral-200 pb-9'>
                <div className="">
                    {listing.description}
                </div>
            </div>

            <MemoizedMap
                center={coordinated}
            />
        </div>
    )
}

export default ListingInfo