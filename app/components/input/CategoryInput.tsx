'use client'
import React from 'react'
import { IconType } from 'react-icons'

interface CategoryBoxProps {
    icon: IconType,
    label: string;
    selected?: boolean;
    onClick: (value: string) => void;
}


const CategoryInput: React.FC<CategoryBoxProps> = ({ icon: Icon, label, selected, onClick }) => {



    return (
        <div
            onClick={() => onClick(label)}
            className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-primary transition dark:bg-[#1d254a] dark:border-[#888aa0] dark:text-white cursor-pointer 
            ${selected ? 'border-primary dark:border-[#bbbdc7] dark:bg-[#515574]' : 'border-neutral-200 dark:border-[#000f36]'}`}
        >
            <Icon size={30} />
            <div className="font-semibold dark:text-[#888aa0]">
                {label}
            </div>
        </div>
    )
}

export default CategoryInput