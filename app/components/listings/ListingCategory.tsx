import React from 'react'
import { IconType } from 'react-icons';

interface ListingCategoryProps {
    icon: IconType | string | undefined;
    title: string | undefined;
    desc: string | undefined;
}

const ListingCategory: React.FC<ListingCategoryProps> = ({ icon: Icon, title, desc }) => {



    return (
        <div className='flex flex-col gap-6 !border-y border-neutral-200 py-9'>
            <div className="flex items-center gap-4">
                {Icon && <Icon size={40} className='text-neutral-600 dark:text-white' />}
                <div className="flex flex-col">
                    <div className="text-lg font-semibold dark:text-[#c1c2d4]">
                        {title}
                    </div>
                    <div className="text-meutral-500 font-light dark:text-[#888aa0]">
                        {desc}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListingCategory