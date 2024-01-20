'use client'
import React, { useCallback } from 'react'
import { SafeUser, SafeListing, SafeReservations } from '../types';
import Image from 'next/image';
import Link from 'next/link';
import typeColors from '@/app/utils/ColorType';
import { IoBedOutline } from "react-icons/io5";
import { LiaBathSolid } from "react-icons/lia";
import { BsPeople } from "react-icons/bs";
import ButtonHeart from '../ButtonHeart';
import ButtonDel from '../ButtonDel';
import UpdateButton from '../UpdateButton';
import useUpdateModal from '@/app/hook/useUpdateModal';
import UpdateModal from '../modals/UpdateModal';

interface ListingCardProps {
    data: SafeListing;
    reservation?: SafeReservations;
    disabled?: boolean;
    actionId?: string;
    actionLabel?: string;
    currentUser?: SafeUser | null;
    fromtrips?: boolean;
    allUser?: any;
    deletebtn?: boolean;
    updatebtn?: boolean;
    onAction?: (id: string) => void;
}


const ListingCard: React.FC<ListingCardProps> =  ({ data, currentUser, allUser, deletebtn, onAction, updatebtn }) => {

    function getUserName(userId: string): string | null {
        const user = allUser?.find((user: SafeUser) => user.id === userId);
        return user ? user.name : null;
    }


    const userName = getUserName(data?.userId);

    const updateModal = useUpdateModal()


    const onUpdate = useCallback(() => {
        updateModal.onOpen()

    }, [])


    return (
        <div className='relative flex flex-col !justify-between'>
            <div className="absolute top-2 right-2 z-50">
                <ButtonHeart
                    currentUser={currentUser}
                    listingId={data.id}
                />
            </div>

            <Link href={`/listings/${data.id}`} className=' flex flex-col justify-between ' >
                <div className="relative w-[100%] h-[350px] !overflow-hidden rounded-xl">
                    <Image
                        alt='listing'
                        fill
                        src={data.imageSrc}
                        className='object-cover rounded-xl hover:scale-[1.05] transition duration-200 '
                    />

                    <div className="absolute text-white  bottom-10 right-0 !rounded-s-md px-2" style={{ backgroundColor: typeColors[data.category as keyof typeof typeColors] }}>
                        {data.category}
                    </div>
                </div>
                <div className="flex flex-col gap-4  ">
                    <div className="flex items-center w-full justify-between mt-3 dark:text-white">
                        <div className="font-extrabold"> {data.title}</div>

                        <div className="font-light text-gray-400 text-xs capitalize dark:text-white">
                            {data.favoriteUserId.length} Like
                        </div>
                    </div>
                    <div className="text-neutral-500 text-sm flex-1 dark:text-[#c0c1ce]">
                        {data.description}
                    </div>
                    <div className={`flex dark:text-[#c0c1ce] !justify-between text-gray-700  flex-1 items-end ${deletebtn && "!items-start"}`}>
                        <div className="flex items-cennter gap-2 ">
                            <IoBedOutline />
                            <div className="text-xs">
                                {data.roomCount} bed
                            </div>
                        </div>
                        <div className="flex items-cennter  gap-2">
                            <LiaBathSolid />
                            <div className="text-xs">
                                {data.bathroomCount} bath
                            </div>
                        </div>
                        <div className="flex items-cennter  gap-2">
                            <BsPeople />
                            <div className="text-xs">
                                {data.guestCount} guest
                            </div>
                        </div>
                    </div>
                    {!deletebtn && (
                        <div className="font-light text-gray-400 text-xs capitalize flex-1  !justify-self-end">by {userName}</div>
                    )}

                </div>
            </Link >
            <div >
                <div className="mt-2">
                    {deletebtn && (
                        <ButtonDel
                            action={onAction}
                        />
                    )}
                </div>
                <div className="mt-2">
                    {updatebtn && (
                        <UpdateButton

                            action={onUpdate}
                        />
                    )}
                </div>
            </div>
            <UpdateModal
                listing={data}
                currentUser={currentUser}
            />
        </div>
    )
}

export default ListingCard