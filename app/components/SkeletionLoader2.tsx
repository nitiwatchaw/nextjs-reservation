import React from 'react'

const SkeletionLoader2 = () => {
    return (
        <div role="status" className="max-w-screen-lg mx-auto animate-pulse  flex-col gap-6">
            <div className="flex flex-col gap-4 mb-6 ">
                <div className="h-[16px] bg-gray-300  dark:bg-gray-800 rounded-full w-48 "></div>
                <div className="h-[10px] bg-gray-200 dark:bg-gray-700 rounded-full !w-60 "></div>
            </div>
            <div className="h-[400px] md:h-[800px] rounded-lg bg-gray-300  dark:bg-gray-800  w-full "></div>
            {/* info */}
            <div className="mt-10 flex-col md:flex-row gap-10">
                <div className="flex-1">
                    <div className="flex flex-col gap-8">
                        <div className="h-[20px] bg-gray-300  dark:bg-gray-800 rounded-full w-60 "></div>
                        <div className="h-[14px] bg-gray-200 dark:bg-gray-700 rounded-full w-96  "></div>
                    </div>
                    <hr className='my-16' />
                    <div className="flex flex-col gap-8">
                        <div className="h-[20px] bg-gray-300  dark:bg-gray-800 rounded-full w-48 "></div>
                        <div className="h-[14px] bg-gray-200 dark:bg-gray-700 rounded-full w-80  "></div>
                    </div>
                    <hr className='my-16' />
                    <div className="flex ">
                        <div className="h-[14px] bg-gray-200 dark:bg-gray-700 rounded-full w-full  "></div>
                    </div>
                    <hr className='my-16' />
                    <div className="h-[400px] md:h-[400px] rounded-lg bg-gray-300  dark:bg-gray-800  w-full mb-6 "></div>
                </div>
                <div className="flex flex-col flex-1 gap-8">
                    <div className="h-[16px] bg-gray-300  dark:bg-gray-800 rounded-full w-48 "></div>
                    <div className="h-[400px] md:h-[600px] rounded-lg bg-gray-200 dark:bg-gray-700  w-full"></div>
                    <div className="h-[20px] bg-gray-300  dark:bg-gray-800 rounded-full w-full mt-6"></div>
                </div>
            </div>


        </div>
    )
}

export default SkeletionLoader2