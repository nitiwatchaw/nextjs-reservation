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
        
            <div className="flex items-center gap-4 bg-neutral-50 p-2 w-full rounded-lg">

                <div className="relative w-[40px] h-[40px] rounded-full overflow-hidden border-2 border-primary">
                    <Image
                        fill
                        alt=''
                        src={user?.imageProfile || user?.image || '/images/placeholder.jpg'}
                        className='w-full h-full object-cover'
                    />
                </div>
                <div className="!capitalize">
                    {user?.name}
                </div>
            </div>
      
    )
}

export default ListingLike