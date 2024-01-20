'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeListing, SafeUser } from '../types';
import Image from 'next/image';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FaRegEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";


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

    const [isEdit, setIsEdit] = useState(false)
    const [editCommentId, setEditCommentId] = useState<string | null>(null);

    const [newComment, setNewComment] = useState('')


    const handleDeleteComment = useCallback((commentId: string) => {

        axios.delete(`/api/comment/${commentId}`)

            .then(() => {
                toast.success(`comment ${commentId} is cancelled`)
                router.refresh()
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error)
                console.log(error)

            })
    }, [router])



    const openInput = useCallback((commentId: string, commentBody: string) => {
        setIsEdit(true);
        setEditCommentId(isEdit ? null : commentId);
        setNewComment(commentBody);
    }, [router, newComment, setNewComment, isEdit]);


    const updateComment = useCallback((commentId: string) => {

        setEditCommentId(isEdit ? null : commentId);

        axios.put(`/api/comment/${commentId}`, {
            commentBody: newComment
        })
            .then(() => {
                toast.success(`comment ${newComment} is changed`)
                setIsEdit(false)
                router.refresh()
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error)
                console.log(error)
            })

    }, [router, newComment, isEdit])



    return (
        <div className='flex flex-col gap-3'>
            <div className="dark:text-[#888aa0]">
                Comments {commentData?.length}
            </div>
            <hr className='dark:border-[#71778e] '/>
            <div className="flex flex-col gap-4 !justify-start ">
                {commentData?.map((comment: any) => (
                    <div className={`${comment.user.id === findHost?.userId ? "!text-primary " : ""} dark:bg-[#1d254a] relative flex bg-neutral-50 rounded-lg p-3 gap-4`} key={comment.id}>
                        {comment.user.id === findCurrentUser?.userId && "(You)" && (
                            <div className='flex items-center gap-4 absolute top-2 right-3'>
                                <div
                                    onClick={() => handleDeleteComment(comment?.id)}
                                    className=" text-neutral-400 text-xs cursor-pointer">
                                    Delete
                                </div>
                                <div
                                    onClick={() => openInput(comment?.id, comment.commentBody)}
                                    className={`text-neutral-400 text-xs cursor-pointer ${isEdit ? "hidden" : ''}`}>
                                    <FaRegEdit />
                                </div>
                                <div
                                    onClick={() => updateComment(comment?.id)}
                                    className={`text-primary text-xs cursor-pointer ${isEdit ? "" : 'hidden'}`}>
                                    <FaCheck />
                                </div>
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
                            <div className="font-bold capitalize dark:text-white">
                                {comment.user.name}
                                <span className='text-xs ml-1'>{comment.user.id === findHost?.userId && "(Host)"}</span>
                                <span className='text-xs ml-1'>{comment.user.id === findCurrentUser?.userId && "(You)"}</span>
                            </div>
                            <div className="text-neutral-500 text-sm dark:text-[#acadb6]">
                                {isEdit && editCommentId == comment.id ?
                                    <input
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        type="text"
                                        placeholder='chage comment'
                                        className='dark:bg-[#1d254a] bg-whtie border w-full pl-2' />
                                    :
                                    comment.commentBody}
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