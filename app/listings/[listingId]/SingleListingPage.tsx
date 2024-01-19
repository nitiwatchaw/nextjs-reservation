'use client'
import React, { useCallback, useEffect, useMemo, useState, } from 'react'
import ListingHead from '@/app/components/listings/ListingHead'
import Container from '@/app/components/Container'
import { SafeListing, SafeUser, SafeReservations } from '@/app/components/types'
import ListingInfo from '@/app/components/listings/ListingInfo'
import ListingReservation from '@/app/components/listings/ListingReservation'
import { Range } from 'react-date-range';
import useLoginModal from '@/app/hook/useLoginModal'
import { useRouter } from 'next/navigation'
import ClientOnly from '@/app/components/ClientOnly'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import axios from 'axios'
import toast from 'react-hot-toast'
import ListingLike from '@/app/components/listings/ListingLike'
import ListingComment from '@/app/components/listings/ListingComment'


const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface listingProps {
    listing?: SafeListing | null;
    currentUser?: SafeUser | null;
    reservations?: SafeReservations[];
    allUser?: any;
    commentData?: any;
}

const ListingSinglePage: React.FC<listingProps> = ({ listing, currentUser, reservations, allUser, commentData }) => {




    const router = useRouter()

    const loginModal = useLoginModal()



    const [isLoading, setIsLoading] = useState(false)
    const [totalPrice, setTotalPrice] = useState(listing?.price)

    const [dateRange, setDateRange] = useState<Range>(initialDateRange)
    const [comment, setComment] = useState('')
    const [haveWord, setHaveWord] = useState(true)

    //? function create Reservation
    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }
        setIsLoading(true);
        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id


        })
            .then(() => {
                toast.success('Listing reserved!')
                setDateRange(initialDateRange)
                router.push('/trips')
            })
            .then(() => {
                router.refresh()
            })
            .catch(() => {
                toast.error('Something went wrong')
            })
            .finally(() => {
                setIsLoading(false)
            })

    }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal])



    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {

            // หา จำนวนวันที่จองทั้งหมด
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            );
            if (dayCount && listing?.price) {
                setTotalPrice(dayCount * listing.price)
            }
        }
        if (!currentUser) {
            if (comment.length >= 1) {
                loginModal.onOpen();
            }
        }

        if (comment.length >= 1) {
            setHaveWord(false)
        } else {
            setHaveWord(true)
        }


    }, [dateRange, listing?.price, comment, setHaveWord, haveWord])


    // ? create วันท่ี่จองไว้
    const disabledDates = useMemo(() => {
        let dates: Date[] = [];
        reservations?.forEach((reservation: any) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate),
            })

            dates = [...dates, ...range]
        });

        return dates
    }, [reservations])


    // ? create comment
    const onSubmitComment: React.MouseEventHandler<HTMLButtonElement> = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        const trimmedComment = comment.trim();

        if (!trimmedComment) {
            toast.error('Comment cannot be empty');
            return;
        }

        axios.post(`/api/comment/${listing?.id}`, {
            userId: currentUser.id,
            commentBody: trimmedComment,
        })
            .then(() => {
                toast.success('Comment submitted!');
                router.refresh()
                setComment('');
            })
            .catch((error) => {
                console.error('Error submitting comment:', error); // Log the error for debugging
                toast.error('Something went wrong');
            });
    }, [comment, currentUser, loginModal, listing?.id]);


    return (
        <ClientOnly>

            <Container>

                <div className="max-w-screen-lg mx-auto">
                    <div className="flex flex-col gap-10">
                        <ListingHead
                            listing={listing}
                            currentUser={currentUser}
                        />
                        <div className="flex  flex-col lg:flex-row gap-10">
                            <ListingInfo
                                listing={listing}
                                currentUser={currentUser}
                            />
                            <ListingReservation
                                totalPrice={totalPrice}
                                listing={listing}
                                currentUser={currentUser}
                                onChangeDate={(value) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />
                        </div>

                        <div className="flex gap-3 items-center justify-between">
                            <div className="font-bold text-lg">
                                Users Love this place ({listing?.favoriteUserId?.length})
                            </div>
                            <div className="flex ">
                                {listing?.favoriteUserId.length !== 0 ?
                                    listing?.favoriteUserId.map((user) => (
                                        <ListingLike
                                            key={user}
                                            listing={user}
                                            currentUser={currentUser}
                                            allUser={allUser}
                                        />
                                    ))
                                    :
                                    <div className='text-neutral-500  text-sm'>
                                        No User Liked
                                    </div>
                                }

                            </div>
                        </div>


                        <div className="flex flex-col gap-3">
                            <input
                                value={comment}
                                type="text"

                                placeholder='what do you thinks about this place...'
                                className='bg-neutral-50 h-[40px] p-6 rounded-sm placeholder:text-sm '
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <button
                                disabled={haveWord}
                                onClick={onSubmitComment}
                                className='disabled:bg-neutral-200  w-full h-[40px] bg-primary my-3 text-white rounded-sm disabled:bg-primary/70 disabled:cursor-progress'>
                                Send
                            </button>
                        </div>
                        {commentData ? <ListingComment
                            allUser={allUser}
                            currentUser={currentUser}
                            listing={listing}
                            commentData={commentData}
                        /> : <div className=''>No comment </div>}




                    </div>
                </div>
            </Container>

        </ClientOnly>
    )
}

export default ListingSinglePage