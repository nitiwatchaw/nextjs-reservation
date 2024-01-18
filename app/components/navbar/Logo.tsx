'use client'
import React from 'react'
import { RiHotelFill } from "react-icons/ri";
import Link from 'next/link';
const Logo = () => {
    return (
        <Link href={'/'} className="flex items-center gap-2   ">
            <RiHotelFill className='text-primary text-2xl' />
            <div className="text-xl font-bold"> Posh</div>
        </Link>
    )
}

export default Logo