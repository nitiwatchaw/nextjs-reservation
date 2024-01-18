'use client'
import React from 'react'
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { SafeUser } from './types';
import useFavorite from '../hook/useFavorite';

interface HeartButtonProps {
    listingId: string | undefined;
    currentUser?: SafeUser | null;

}

const ButtonHeart: React.FC<HeartButtonProps> = ({ currentUser, listingId }) => {

    const { hasFavorited, toggleFavorite } = useFavorite({ listingId: listingId ?? '', currentUser })


    return (
        <button
            onClick={toggleFavorite}
            className='bg-white rounded-full w-10 h-10 flex items-center justify-center'>
            {hasFavorited ? <IoMdHeart size={23} style={{ color: 'red' }} /> : <IoMdHeartEmpty size={23} />}
        </button>
    )
}

export default ButtonHeart