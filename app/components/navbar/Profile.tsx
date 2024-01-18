'use client'
import React from 'react'
import { SafeUser } from '../types'
import useLoginModal from '@/app/hook/useLoginModal'


interface ProfileProps {
    currentUser?: SafeUser | null
}

const Profile: React.FC<ProfileProps> = ({ currentUser }) => {


    const loginModal = useLoginModal()

    return (
        <>
            {
                currentUser ?
                    <div className='flex items-baseline gap-2 pt-10 pb-2  border-b-2 border-neutral-200 !justify-end'>
                        <div className="text-neutral-400 text-xs">
                            Welcome
                        </div>
                        <div className="font-bold capitalize text-primary ">
                            {currentUser?.name}
                        </div>
                    </div> :
                   
                        <div
                            className='flex items-center gap-2 pt-8 pb-2 px-6  border-b-2 border-neutral-200 !justify-end cursor-pointer'>
                            <div className="font-bold hover:bg-neutral-200 rounded-lg px-4 py-2" onClick={() => loginModal.onOpen()}>
                                Login to discover more !
                            </div>
                        </div>
                   
            }
        </>
    )
}

export default Profile