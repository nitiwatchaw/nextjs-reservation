'use client'
import React, { useMemo, useState, useEffect } from 'react'
import { FaRegMap } from "react-icons/fa";
import { VscCalendar } from "react-icons/vsc";
import { FaRegUser } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import useSearchModal from '@/app/hook/useSearchModal';
import { useSearchParams } from 'next/navigation';
import useCountries from '@/app/hook/useCountries';
import { differenceInDays } from 'date-fns';
import { useRouter } from 'next/navigation';
const MenuSearch = () => {

    const router = useRouter()
    const searchModal = useSearchModal()
    const params = useSearchParams()
    const { getByValue } = useCountries()

    const locaitonValue = params?.get('locationValue')
    const startDate = params?.get('startDate')
    const endDate = params?.get('endDate')
    const guestCount = params?.get('guestCount')


    const [haveSearch, setHaveSearch] = useState(false)

    const locationLabel = useMemo(() => {
        if (locaitonValue) {
            return getByValue(locaitonValue as string)?.label
        }

        return 'AnyWhere'
    }, [getByValue, locaitonValue])

    const durationLabel = useMemo(() => {
        if (startDate && endDate) {

            const start = new Date(startDate as string)
            const end = new Date(endDate as string)

            let diff = differenceInDays(end, start)

            if (diff === 0) {
                diff - 1
            }
            return `${diff} Days`
        }

        return 'AnyWeek'
    }, [startDate, endDate])

    const guestLabel = useMemo(() => {
        if (guestCount) {
            return `${guestCount} Guests`
        }
        return 'Guests'
    }, [guestCount])

    useEffect(() => {
        if (locaitonValue || startDate || endDate || guestCount) {
            setHaveSearch(true)
        }
        else {
            setHaveSearch(false)
        }

    }, [params])

    return (
        <div className='flex item-center flex-col gap-6 md:flex-row'>
            <div onClick={searchModal.onOpen}
                className='flex items-center border-neutral-200 dark:border-gray-500 border-[2px] py-1 px-6 gap-6 rounded-full cursor-pointer hover:shadow-md'>

                <div className="flex items-center gap-2 ">
                    <FaRegMap className='text-md hidden sm:block' />
                    <div className="text-sm font-semibold">{locationLabel}</div>
                </div>
                <div className="border-[1px] border-black dark:border-gray-500 b  h-5"></div>
                <div className="flex items-center gap-2 ">
                    <VscCalendar className='text-md hidden sm:block' />
                    <div className="text-sm  font-semibold">{durationLabel}</div>
                </div>
                <div className="border-[1px] border-black dark:border-gray-500 b h-5"></div>
                <div className="flex items-center gap-2 ">
                    <FaRegUser className='text-md hidden sm:block' />
                    <div className="text-sm  font-semibold">{guestLabel}</div>
                    <div className="bg-primary rounded-full w-8 h-8  text-white text-lg flex items-center justify-center  ml-2">
                        <IoIosSearch />
                    </div>

                </div>

            </div>
            {haveSearch && (
                <div onClick={() => router.push('/')} className="  flex items-center justify-center    ">
                    <button className='h-[35px] text-sm bg-neutral-200  dark:bg-primary-dark dark:border-gray-500 dark:border-2  rounded-full w-16 font-bold '>Clear</button>
                </div>
            )}

        </div>
    )
}

export default MenuSearch