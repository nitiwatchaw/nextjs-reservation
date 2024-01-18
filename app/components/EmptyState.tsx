'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import Header from './Header';
import useRentModal from '../hook/useRentModal';


interface EmptyState {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
    center?: boolean;
    addPropbtn?: boolean;
    tripbtn?: boolean;
  
}


const EmptyState: React.FC<EmptyState> = ({
    title = 'No exact matches',
    subtitle = 'Try changing or removing some of your filters',
    showReset,
    addPropbtn,
    tripbtn,
}) => {

    const router = useRouter()
    const rentModal = useRentModal()


    return (
        <div className='h-[60vh] flex flex-col gap-2 justify-center items-center'>
            <Header
                title={title}
                desc={subtitle}
                center

            />
            {addPropbtn && (
                <div className="mt-6">
                    <button
                        className=' rounded-md  p-3 bg-primary text-white hover:bg-primary/90'
                        onClick={() => rentModal.onOpen()}>Add you Property</button>
                </div>
            )}
            {tripbtn && (
                <div className="mt-6">
                    <button
                        className=' rounded-md  p-3 bg-primary text-white hover:bg-primary/90'
                        onClick={() => router.push('/')}>Add you Trips</button>
                </div>
            )}
   
            <div className="w-48 mt-4" >
                {showReset && (
                    <button onClick={() => router.push('/')}>No Page Founded</button>
                )}
            </div>
        </div >
    )
}

export default EmptyState