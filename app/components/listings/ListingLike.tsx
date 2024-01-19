'use client'
import React from 'react'
import { SafeUser } from '../types';
import Image from 'next/image';

interface listingProps {
    listing?: string;
    currentUser?: SafeUser | null;
    allUser?: SafeUser[]
}


const ListingLike: React.FC<listingProps> = ({ listing, currentUser, allUser }) => {


    const user = allUser?.find((user) => user.id === listing);

    return (
        <div className="flex items-center rounded-lg -ml-4">
            <div className="relative w-[40px] h-[40px] rounded-full overflow-hidden border-2 border-primary">
                <Image
                    fill
                    alt=''
                    src={user?.imageProfile || user?.image || '/images/placeholder.jpg'}
                    className='w-full h-full object-cover'
                />
            </div>
            
        </div>

    )
}

export default ListingLike