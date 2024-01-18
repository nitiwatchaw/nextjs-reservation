'use client'
import React, { useCallback, useState } from 'react'
import MenuItem from './MenuItem';
import { IoMdHeartEmpty } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import useRegisterModal from '@/app/hook/useRegisterModal';
import useLoginModal from '@/app/hook/useLoginModal';
import { signOut } from "next-auth/react";
import Avatar from '../Avatar'
import { SafeUser } from '../types';
import useRentModal from '@/app/hook/useRentModal';

interface NavbarProps {
    currentUser?: SafeUser | null;
}


const UserMenu: React.FC<NavbarProps> = ({ currentUser }) => {

    const router = useRouter()

    const [open, setOpen] = useState(true)


    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const rentModal = useRentModal()

    const onRent = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen()
        }

        rentModal.onOpen()
    }, [currentUser, loginModal, rentModal])

    const goFav = () => {
        if (!currentUser) {
            loginModal.onOpen()
        }
        else {
            router.push('/favourites')
        }
    }


    return (
        <div className='relative'>
            <div className="flex gap-6 items-center  " >

                <button onClick={onRent} className="border-neutral-200 hover:shadow-md h-[43px] gap-2 sm:hidden lg:flex  flex rounded-full px-3  border-2  items-center justify-center cursor-pointer">
                    <FaPlus />
                    <div className="text-sm font-semibold " style={{ lineHeight: '0' }}>Properties</div>
                </button>

                <button onClick={goFav} className="border-neutral-200 hover:shadow-md sm:hidden flex  lg:flex rounded-full w-16 h-[43px] border-2  items-center justify-center cursor-pointer">
                    <IoMdHeartEmpty className='text-2xl ' />
                </button>
                <button onClick={() => setOpen(!open)}
                    className={`border-neutral-200 hover:bg-neutral-100 rounded-full  gap-2 px-3 h-[43px] border-2 flex items-center justify-center cursor-pointer
                ${open ? 'bg-neutral-200 ' : null}
                `}>
                    <IoMenu className='text-2xl' />
                    {currentUser && <Avatar src={currentUser?.image || currentUser?.imageProfile} />}
                </button>
            </div>
            {open && (

                <div className="bg-white shadow-md absolute top-[55px] right-[5px] w-[220px]  z-[500] rounded-lg">
                    {currentUser ? (
                        <>
                            <MenuItem onClick={() => router.push('/trips')} label='My trips' />
                            <MenuItem onClick={() => router.push('/favourites')} label='My Favorites' />
                            <MenuItem onClick={() => router.push('/reservations')} label='My reservation order' />
                            <MenuItem onClick={() => router.push('/properties')} label='My properties' />
                            <MenuItem onClick={rentModal.onOpen} label='add new properties' />
                            <hr />
                            <MenuItem onClick={() => signOut()} label='Logout' />
                        </>
                    )
                        :
                        <>
                            <MenuItem onClick={() => loginModal.onOpen()} label='login' />
                            <MenuItem onClick={() => registerModal.onOpen()} label='Sign up' />

                        </>
                    }
                </div>
            )}


        </div >

    )
}

export default UserMenu