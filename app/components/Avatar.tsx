'use client'
import React from 'react'
import Image from 'next/image'

interface AvatarProps {
    src?: string | null | undefined | never
}
const Avatar: React.FC<AvatarProps> = ({ src }) => {
    return (
        <div className="relative w-[30px] h-[30px] border-2 border-white rounded-full ">
            <Image
                className='rounded-full object-cover '
                fill
                alt='Avatar'
                src={src || '/images/placeholder.jpg'} />
        </div>
    )
}

export default Avatar