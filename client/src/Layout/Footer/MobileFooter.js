import React from 'react'
import { NavLink } from 'react-router-dom'
import { BsCollectionPlay } from 'react-icons/bs'
import { FiHeart, FiUserCheck } from 'react-icons/fi'
import { HiHome } from "react-icons/hi2";

function MobileFooter() {
    const active = 'bg-subMain text-main'
    const inActive = 'transitions text-2xl flex-colo hover:bg-subMain text-white rounded-md px-4 py-3'
    const Hover = ({ isActive }) => isActive ? `${active} ${inActive}` : inActive
    return (
        <>
            <div className='flex-btn h-full bg-white rounded cursor-pointer overflow-y-scroll flex-grow w-full'>
                {/* drawer */}
            </div>
            <footer className='lg:hidden fixed z-50 bottom-0 w-full px-1'>
                <div className='bg-dry rounded-md flex-btn w-full p-1 px-1'>
                    <NavLink to='/' className={Hover}>
                        <HiHome />
                    </NavLink>
                    <NavLink to='/movies' className={Hover}>
                        <BsCollectionPlay />
                    </NavLink>
                    <NavLink to="/favorites" className={Hover}>
                        <div className='relative'>
                            <div className='w-5 h-5 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-5 -right-1'>
                                7
                            </div>
                            <FiHeart />
                        </div>
                    </NavLink>
                    <NavLink to='/login' className={Hover}>
                        <FiUserCheck />
                    </NavLink>
                </div>
            </footer>
        </>
    )
}

export default MobileFooter