'use client'
import React, { useEffect, useState } from 'react'
import { SafeListing, SafeUser } from '../types';
import Image from 'next/image';



interface ListingCommentProps {
    listing?: SafeListing | null | undefined;
    currentUser?: SafeUser | null;
    allUser?: SafeUser[];
    commentData?: any
}


const ListingComment: React.FC<ListingCommentProps> = ({ listing, currentUser, allUser, commentData }) => {

    const findHost = commentData?.find((user: any) => user.userId == listing?.userId)

    const findCurrentUser = commentData?.find((user: any) => user.userId == currentUser?.id)


    return (
        <div className='flex flex-col gap-3'>
            <div className="">
                Comments {commentData?.length}
            </div>
            <hr />
            <div className="flex flex-col gap-4 !justify-start ">
                {commentData?.map((comment: any) => (
                    <div className={`${comment.user.id === findHost?.userId ? "text-primary" : ""} flex bg-neutral-50 rounded-lg p-3 gap-4`} key={comment.id}>
                        <div className="flex items-center gap-3 ">
                            <div className="relative w-10 h-10 rounded-full   ">
                                <Image
                                    fill
                                    alt='user'
                                    className='w-full h-full rounded-full  object-cover'
                                    src={comment.user.image || comment.user.imageProfile || '/images/placeholder.jpg'}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col flex-1">
                            <div className="font-bold capitalize">
                                {comment.user.name}
                                <span className='text-xs ml-1'>{comment.user.id === findHost?.userId && "(Host)"}</span>
                                <span className='text-xs ml-1'>{comment.user.id === findCurrentUser?.userId && "(You)"}</span>
                            </div>
                            <div className="text-neutral-500 text-sm">
                                {comment.commentBody}
                            </div>

                        </div>
                        <div className="self-end text-xs text-neutral-400">
                            {comment.createdAt.toString().slice(0, 16)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListingComment