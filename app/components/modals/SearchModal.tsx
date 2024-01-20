'use client'
import React, { useCallback, useState, useEffect, useMemo } from 'react'
import useSearchModal from '@/app/hook/useSearchModal'
import { useRouter, useSearchParams } from 'next/navigation'
import { Range } from 'react-date-range'
import dynamic from 'next/dynamic'
import qs from 'query-string'
import { CountrySelectValue } from '../input/CountrySelect'
import { formatISO } from 'date-fns'
import Header from '../Header'
import CountrySelect from '../input/CountrySelect'
import Calenda from '../input/Calenda'
import Counter from '../input/Counter'

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
}


const SearchModal = () => {

    const searchModal = useSearchModal()
    const params = useSearchParams()
    const router = useRouter()
    

    const [showModal, setShowModal] = useState(searchModal.isOpen)
    const [locaiton, setLocation] = useState<CountrySelectValue>()
    const [step, setStep] = useState(STEPS.LOCATION)
    const [guestCount, setGuestCount] = useState(1)
    const [roomCount, setRoomCount] = useState(1)
    const [bathroomCount, setBathroomCount] = useState(1)
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'

    })

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location])

    const onBack = useCallback(() => {
        setStep((value) => value - 1)
    }, [])


    const onNext = useCallback(() => {
        setStep((value) => value + 1)
    }, [])


    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO) {
            return onNext()
        }

        let currentQuery = {}

        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        //? เป็นการรวมค่าต่างๆที่ เลือกแล้ว แสดงให้เป็นurl 
        const updatedQuery: any = {
            ...currentQuery,
            locationValue: locaiton?.value,
            guestCount,
            roomCount,
            bathroomCount
        }

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate)
        }
        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate)
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true })


        setStep(STEPS.LOCATION)

        searchModal.onClose()

        router.push(url)

        console.log(updatedQuery)
    }, [
        step,
        searchModal,
        locaiton,
        router,
        guestCount,
        roomCount,
        bathroomCount,
        dateRange,
        onNext,
        params
    ])




    useEffect(() => {
        setShowModal(searchModal.isOpen);
    }, [searchModal.isOpen]);

    const handleClose = useCallback(() => {

        setShowModal(false)

        setTimeout(() => {
            searchModal.onClose();
        }, 300)

    }, [searchModal.onClose])


    if (!searchModal.isOpen) {
        return null;
    }


    // step1
    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Header
                title='Where do you wanna go'
                desc='Find the perfect location'
            />
            <CountrySelect
                value={locaiton}
                onChange={(value) => setLocation(value as CountrySelectValue)}
            />
            <hr className='dark:border-[#71778e]'/>
            <Map center={locaiton?.latlng} />
            <button onClick={onNext} className='mt-10 w-full h-[50px] bg-primary dark:bg-[#94c5b5] dark:text-[#11171e] text-white text-xl rounded-md'>
                Next
            </button>
        </div>
    )

    // step2
    if (step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Header
                    title='When do you plan to go?'
                    desc='Make sure everyone is free!'
                />
                <Calenda
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)}
                />
                <div className="flex gap-2">
                    <button onClick={onBack} className='mt-10 w-full dark:bg-[#373c5f] dark:text-white dark:border-[#373c5f] h-[50px] bg-white text-primary border-primary border-2 text-xl rounded-md'>
                        Back
                    </button>
                    <button onClick={onNext} className='mt-10 w-full h-[50px] bg-primary dark:bg-[#94c5b5]  dark:text-black text-white text-xl rounded-md'>
                        Next
                    </button>
                </div>
            </div>
        )
    }
    // step3
    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Header
                    title='When do you plan to go?'
                    desc='Make sure everyone is free!'
                />
                <Counter
                    title='Guests'
                    subtitle='How many guests are coming?'
                    value={guestCount}
                    onChange={(value) => setGuestCount(value)}
                />
                <Counter
                    title='Guests'
                    subtitle='How many room do you need?'
                    value={roomCount}
                    onChange={(value) => setRoomCount(value)}
                />
                <Counter
                    title='Guests'
                    subtitle='How many bathrooms do you needs?'
                    value={bathroomCount}
                    onChange={(value) => setBathroomCount(value)}
                />

                <div className="flex gap-2">
                    <button onClick={onBack} className='mt-10 w-full h-[50px] dark:bg-[#373c5f] dark:text-white dark:border-[#373c5f] bg-white text-primary border-primary border-2 text-xl rounded-md'>
                        Back
                    </button>
                    <button onClick={onSubmit} className='mt-10 w-full h-[50px] bg-primary dark:bg-[#94c5b5]  dark:text-black text-white text-xl rounded-md'>
                        Search
                    </button>
                </div>
            </div>
        )
    }


    return (
        <div className={`flex justify-center items-center overflow-x-hidden 
        overflow-y-auto fixed inset-0 outline-none  z-[9999]
        focus:outline-none bg-neutral-800/70 dark:bg-[#515574]/70 `}>
            <div className={`
              ${showModal ? ' translate-y-0' : 'translate-y-full'}
              ${showModal ? ' opacity-100' : 'opacity-0'}
            bg-white relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 rounded-lg dark:bg-[#000f36]
        my-6 mx-auto  lg:h-auto md:h-auto z-50 translate transition duration-300 h-full`}>
                <div className="text-center relative text-lg flex items-center justify-center h-[80px]">
                    <button className='absolute left-10 text-2xl font-bold dark:text-[#888aa0]' onClick={handleClose}>x</button>
                    <div className="text-xl dark:text-white">Filter</div>
                </div>
                <hr className='dark:border-[#71778e]'/>

                <div className="p-6">
                    {bodyContent}

                </div>

            </div>

        </div>
    )
}

export default SearchModal