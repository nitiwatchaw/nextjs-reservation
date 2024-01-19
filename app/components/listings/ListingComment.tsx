'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeListing, SafeUser } from '../types';
import Image from 'next/image';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';



interface ListingCommentProps {
    listing?: SafeListing | null | undefined;
    currentUser?: SafeUser | null;
    allUser?: SafeUser[];
    commentData?: any
}


const ListingComment: React.FC<ListingCommentProps> = ({ listing, currentUser, allUser, commentData }) => {

    const findHost = commentData?.find((user: any) => user.userId == listing?.userId)

    const findCurrentUser = commentData?.find((user: any) => user.userId == currentUser?.id)

    const router = useRouter()


    const handleDeleteComment = useCallback((commentId: string) => {

       
        axios.delete(`/api/comment/${commentId}`)
            
            .then(() => {
                toast.success(`Resevation ${commentId} is cancelled`)
                router.refresh()
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error)
                console.log(error)

            })
    }, [router])


    return (
        <div className='flex flex-col gap-3'>
            <div className="">
                Comments {commentData?.length}
            </div>
            <hr />
            <div className="flex flex-col gap-4 !justify-start ">
                {commentData?.map((comment: any) => (
                    <div className={`${comment.user.id === findHost?.userId ? "text-primary" : ""} relative flex bg-neutral-50 rounded-lg p-3 gap-4`} key={comment.id}>
                        {comment.user.id === findCurrentUser?.userId && "(You)" && (
                            <div
                                onClick={() => handleDeleteComment(comment?.id)}
                                className="absolute top-2 right-3 text-neutral-400 text-xs cursor-pointer">
                                Delete
                            </div>
                        )}
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