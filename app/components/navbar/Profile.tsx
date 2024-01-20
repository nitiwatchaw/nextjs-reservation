'use client'
import React, { useState, useEffect } from 'react'
import { SafeUser } from '../types'
import useLoginModal from '@/app/hook/useLoginModal'
import { RiMoonClearLine } from "react-icons/ri";
import { CiCloudSun } from "react-icons/ci";

interface ProfileProps {
    currentUser?: SafeUser | null
}

const Profile: React.FC<ProfileProps> = ({ currentUser }) => {


    const loginModal = useLoginModal()

    const [isDarkmode, setIsDarkmode] = useState(() => {
        const storedMode = window.localStorage.getItem('reservation-project-Darkmode');
        return storedMode ? JSON.parse(storedMode) : false;
    })


    const handleDarkMode = () => {
        document.body.classList.toggle('dark');
        setIsDarkmode((prevMode: any) => !prevMode)
    }

    useEffect(() => {
        window.localStorage.setItem('reservation-project-Darkmode', JSON.stringify(isDarkmode))
        if (isDarkmode) {
            document.body.classList.add('dark');
        }
    }, [isDarkmode]);





    return (
        <>
            {
                currentUser ?
                    <div className='flex items-baseline gap-2 pt-10 pb-2  border-b-2 border-neutral-200 dark:border-bor-dark !justify-end'>
                        <div className="text-neutral-400 text-xs">
                            Welcome
                        </div>
                        <div className="font-bold capitalize text-primary ">
                            {currentUser?.name}
                        </div>
                        <div className="dark:text-white">
                            {isDarkmode ? <button onClick={handleDarkMode}><RiMoonClearLine size={25} /></button> :
                                <button onClick={handleDarkMode}><CiCloudSun size={25} /></button>
                            }
                        </div>
                    </div> :

                    <div
                        className='flex items-center gap-2 pt-8 pb-2 px-6  border-b-2 border-neutral-200 !justify-end cursor-pointer'>
                        <div className="dark:text-white font-bold hover:bg-neutral-200 rounded-lg px-4 py-2" onClick={() => loginModal.onOpen()}>
                            Login to discover more !
                        </div>
                        <div className="dark:text-white">
                            {isDarkmode ? <button onClick={handleDarkMode}><RiMoonClearLine size={25} /></button> :
                                <button onClick={handleDarkMode}><CiCloudSun size={25} /></button>
                            }
                        </div>
                    </div>

            }
        </>
    )
}

export default Profile