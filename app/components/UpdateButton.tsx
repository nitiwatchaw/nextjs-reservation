import React from 'react'
interface ButtonProps {
    action?: any;
   
}

const UpdateButton: React.FC<ButtonProps> = ({ action }) => {
    return (
        <button onClick={action} className='bg-indigo-500 w-full h-[40px] text-white rounded-lg hover:bg-indigo-600'>
            Update propertise
        </button>
    )
}

export default UpdateButton