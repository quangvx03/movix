import React from 'react'
import SideBar from '../SideBar'
import { FaRegListAlt, FaUser } from 'react-icons/fa'
import { HiViewGridAdd } from 'react-icons/hi'
import { Movies } from './../../../Data/MovieData';
import Table from './../../../Components/Table';

function Dashboard() {
    const DashboardData = [
        {
            bg: 'bg-orange-600',
            icon: FaRegListAlt,
            title: 'Tổng số phim',
            total: 90
        },
        {
            bg: 'bg-blue-600',
            icon: HiViewGridAdd,
            title: 'Tất cả thể loại',
            total: 13
        },
        {
            bg: 'bg-green-600',
            icon: FaUser,
            title: 'Tổng số người dùng',
            total: 100
        },
    ]
    return (
        <SideBar>
            <h2 className='text-xl font-bold'>Bảng điều khiển</h2>
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4'>
                {DashboardData.map((data, index) => (
                    <div key={index} className='p-4 rounded bg-main border-border grid grid-cols-4 gap-2'>
                        <div className={`col-span-1 rounded-full h-12 w-12 flex-colo ${data.bg}`}>
                            <data.icon />
                        </div>
                        <div className='col-span-3'>
                            <h2>{data.title}</h2>
                            <p className='mt-2 font-bold'>{data.total}</p>
                        </div>
                    </div>
                ))}
            </div>
            <h3 className='text-base font-medium my-6 text-border'>Phim gần đây</h3>
            <Table data={Movies.slice(0, 5)} admin={true} />
        </SideBar>
    )
}

export default Dashboard