import React from 'react'

interface ButtonProps {
    action?: any;
}


const ButtonDel: React.FC<ButtonProps> = ({ action }) => {
    return (
        <button onClick={action} className=' dark:bg-[#373c5f] dark:text-white bg-rose-500 w-full h-[40px] text-white rounded-lg hover:bg-rose-600'>
            Delete propertise
        </button>
    )
}

export default ButtonDel