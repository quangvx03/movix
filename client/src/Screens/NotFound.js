import React from 'react'
import { Link } from 'react-router-dom'
import { HiHome } from 'react-icons/hi2';

function NotFound() {
    return (
        <div className='flex-colo w-full gap-8 min-h-screen text-white bg-main lg:py-20 py-10 px-6'>
            <img
                className='w-full h-96 object-contain'
                src='/images/404.png'
                alt='notfound' />
            <h1 className='lg:text-4xl font-bold'>
                Không tìm thấy trang
            </h1>
            <p className='font-medium text-border italic leading-6'>
                Xin lỗi, chúng tôi không tìm thấy trang mà bạn cần!
            </p>
            <Link
                to='/'
                className='bg-subMain transitions text-white flex-rows gap-4 font-medium py-3 hover:text-main px-6 rounded-md'>
                <HiHome />Trang chủ
            </Link>
        </div>
    )
}

export default NotFound