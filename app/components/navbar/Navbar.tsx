
import React from 'react'
import MenuSearch from './MenuSearch';
import Category from './Category';
import Logo from './Logo';
import UserMenu from './UserMenu';
import { SafeUser } from '../types';
import Profile from './Profile';

interface NavbarProps {
    currentUser?: SafeUser | null
}


const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {


    return (
        <>
            <Profile currentUser={currentUser} />
            <div className='dark:text-white flex items-center gap-5 md:gap-0 border-b-2 py-6 border-neutral-200 dark:border-bor-dark   justify-between  md:mb-0 flex-col md:flex-row md:mt-0'>
                <Logo />
                <MenuSearch />
                <UserMenu currentUser={currentUser} />

            </div>
            <div className="">
                <Category />
            </div>
        </>
    )
}

export default Navbar