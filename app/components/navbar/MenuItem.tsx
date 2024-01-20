import React from 'react'

interface UserMenuProps {
    onClick?: () => void;
    label: string;
}

const MenuItem: React.FC<UserMenuProps> = ({ onClick, label }) => {
    return (
        <div onClick={onClick} className='px-4 py-3 cursor-pointer hover:bg-neutral-100 hover:dark:bg-[#1d254a] text-sm transition font-semibold dark:font-light'>
            {label}

        </div>
    )
}

export default MenuItem