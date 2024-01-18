import React from 'react'

const SkeletionSingleLoader = () => {
    return (
        <div className='animate-pulse' role="status">
            {/* listing */}
            <div className="flex flex-col gap-3">
                <div className="bg-gray-200 w-[100%] h-[350px] rounded-lg">

                </div>
                <div className="bg-gray-300 w-[100%] h-[12px] rounded-lg"></div>
                <div className="bg-gray-200 w-[90%] h-[10px] rounded-lg"></div>
                <div className="bg-gray-200 w-[60%] h-[10px] rounded-lg"></div>
                <div className="bg-gray-200 w-[100%] h-[10px] rounded-lg"></div>
            </div>

        </div>
    )
}

export default SkeletionSingleLoader