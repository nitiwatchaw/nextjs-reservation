'use client'
import React, { useCallback, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
import { GiWindmill, GiIsland, GiBoatFishing, GiCastle, GiForestCamp, GiCaveEntrance, GiCactus, GiBarn } from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'
import { FaSkiing } from 'react-icons/fa'
import { useSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation'
import { MdAlignHorizontalLeft } from "react-icons/md";
import { BsSnow } from 'react-icons/bs'
import { IoDiamond } from 'react-icons/io5'
import { useRouter } from 'next/navigation';

import { Suspense } from 'react';
import CategoriesBox from './CategoriesBox';

export const categories = [
    {
        label: 'All',
        icon: MdAlignHorizontalLeft,
        description: 'All styles for you'
    },
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property is close to the beach!'
    },
    {
        label: 'Windmill',
        icon: GiWindmill,
        description: 'This property is  windmill!'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This property is  modern!'
    },
    {
        label: 'Countryside',
        icon: TbMountain,
        description: 'This property is  countryside!'
    },
    {
        label: 'Pools',
        icon: TbPool,
        description: 'This property is  pools!'
    },
    {
        label: 'Islands',
        icon: GiIsland,
        description: 'This property is on an islands!'
    },
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description: 'This property is close to a lake!'
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'This property has skiing activities!'
    },
    {
        label: 'Castles',
        icon: GiCastle,
        description: 'This property is in a castle!'
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        description: 'This property has camping activities!'
    },
    {
        label: 'Arctic',
        icon: BsSnow,
        description: 'This property is in a arctic!'
    },
    {
        label: 'Cave',
        icon: GiCaveEntrance,
        description: 'This property is in a cave!'
    },
    {
        label: 'Desert',
        icon: GiCactus,
        description: 'This property is in a desert!'
    },
    {
        label: 'Barns',
        icon: GiBarn,
        description: 'This property is in the barn!'
    },
    {
        label: 'Lux',
        icon: IoDiamond,
        description: 'This property is luxurious!'
    },

]


const Category = () => {


    const [select, setSelect] = useState<string | boolean>('All')
    const pathname = usePathname()
    const params = useSearchParams()

    const category = params?.get('category')
    const isMainPage = pathname === '/'


    if (!isMainPage) {
        return null
    }


    return (

        <>
            <Swiper
                navigation={true}
                modules={[Navigation]}
                slidesPerView={5}

                breakpoints={{
                    300: {
                        slidesPerView: 3,
                    },
                    576: {
                        slidesPerView: 4,
                    },
                    768: {
                        slidesPerView: 5,
                    },
                    992: {
                        slidesPerView: 6,
                    },
                    1200: {
                        slidesPerView: 9,
                    },
                    1500: {
                        slidesPerView: 10,
                    },
                    1700: {
                        slidesPerView: 11,
                    },
                    1900: {
                        slidesPerView: 12,
                    },
                    2100: {
                        slidesPerView: 13,
                    },
                    2300: {
                        slidesPerView: 14,
                    },
                    2500: {
                        slidesPerView: 15,
                    },
                }}
                className="h-[80px] border-b-[1px] border-neutral-300">
                <Suspense fallback="loading">
                    {categories.map((item, index) => (
                        <SwiperSlide key={index} className='h-full flex items-center justify-center'>
                            <CategoriesBox
                                item={item}
                                setSelect={setSelect}
                                select={select}
                            />
                        </SwiperSlide>
                    ))}
                </Suspense>
            </Swiper>


        </>

    )
}

export default Category