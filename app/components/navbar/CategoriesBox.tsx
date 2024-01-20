'use client'
import React, { useCallback, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string'

interface CategoryBoxProps {
    item?: any;
    select: string | boolean
    setSelect: React.Dispatch<React.SetStateAction<string | boolean>>
}


const CategoriesBox: React.FC<CategoryBoxProps> = ({ item, select, setSelect }) => {

    const router = useRouter()
    const params = useSearchParams()


    const onClick = useCallback((item: any) => {
        if (item.label === select && select !== 'All') {
            setSelect(!select);
        } else {
            setSelect(item.label);
        }

        let currentQuery = {}


        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updateQuery: any = {
            ...currentQuery, category: item.label
        }

        if (item.label === 'All') {
            delete updateQuery.category;
            router.push('/');
            return; // Stop further execution
        }

        if (params?.get('category') === item.label) {
            delete updateQuery.category;
        }


        const url = qs.stringifyUrl({
            url: '/',
            query: updateQuery
        }, { skipNull: true })



        router.push(url)

    }, [select, params, router,])

    return (
        <div className="w-full flex justify-center h-full items-center dark:!text-white">
            <button
                onClick={() => onClick(item)}
                className={`
${select === item?.label ? 'bg-primary text-white dark:text-white ' : ''}
flex rounded-full h-[40px] hover:dark:text-white  items-center text-neutral-700 font-light  gap-3 justify-center px-[20px] dark:text-text-dark`}>
                <item.icon size={25} />
                <p className='text-sm'>{item.label}</p>
            </button>
        </div>
    )
}

export default CategoriesBox