import React from 'react'

interface HeaderProps {
    title: string;
    desc: string;
    center?: boolean
}

const Header: React.FC<HeaderProps> = ({ title, desc, center }) => {
    return (
        <div className={`${center ? "text-center" : ""}`}>
            <div className="text-xl font-bold dark:text-white">
                {title}
            </div>
            <div className="text-light text-neutral-800 mt-2 dark:text-text-dark">
                {desc}
            </div>
        </div>
    )
}

export default Header