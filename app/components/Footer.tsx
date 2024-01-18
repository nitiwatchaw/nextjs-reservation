import React from 'react'
import { MdHotelClass } from "react-icons/md";
const Footer = () => {
    return (
        <div className='p-20 bg-gray-50'>
            <div className="flex gap-20 items-center lg:justify-center flex-wrap ">
                <div className="hidden md:block">
                    <MdHotelClass size={40} />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="font-extrabold text-sm">COMPANY</div>
                    <div className="text-xs font-medium">About</div>
                    <div className="text-xs font-medium">Carrers</div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="font-extrabold text-sm">SUPPORT</div>
                    <div className="text-xs font-medium">FAQs</div>
                    <div className="text-xs font-medium">Track Order</div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="font-extrabold text-sm">WHOLESALE</div>
                    <div className="text-xs font-medium">Domestic</div>
                    <div className="text-xs font-medium">International</div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="font-extrabold text-sm">CONTACT</div>
                    <div className="text-xs font-medium">Cutom Orders</div>
                    <div className="text-xs font-medium">Donation Request</div>
                </div>

            </div>
        </div>
    )
}

export default Footer