import React from 'react'
import { SafeListing } from '@/app/components/types'
import { SafeUser } from '@/app/components/types'
import useCountries from '@/app/hook/useCountries'
import Image from 'next/image'
import ButtonHeart from '../ButtonHeart'
interface listingProps {
    listing?: SafeListing | null;
    currentUser?: SafeUser | null;
}


const ListingHead: React.FC<listingProps> = ({ listing, currentUser }) => {

    const { getByValue } = useCountries()


    const location = listing?.locationValue ? getByValue(listing.locationValue) : undefined;



    return (
        <div className='flex flex-col gap-4'>
            <div className="">
                <div className="text-xl font-bold">{listing?.title}</div>
                <div className="font-gray">{location?.region} , {location?.label}</div>
            </div>

            <div className="relative w-full h-[400px] md:h-[800px] rounded-lg">
                <Image
                    fill
                    alt='location'
                    src={listing?.imageSrc || '/images/placeholder.jpg'}
                    className='w-full h-full object-cover rounded-lg'
                />
                <div className="absolute top-3 right-3">
                    <ButtonHeart
                        listingId={listing?.id}
                        currentUser={currentUser} />
                </div>
            </div>


        </div>
    )
}

export default ListingHead