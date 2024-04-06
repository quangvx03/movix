import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    const Links = [
        {
            title: 'Danh mục',
            links: [
                {
                    name: 'Trang chủ',
                    link: '/'
                },
                {
                    name: 'Phim',
                    link: '/movies'
                },
                {
                    name: 'Giới thiệu',
                    link: '/about-us'
                },
                {
                    name: 'Liên hệ',
                    link: '/contact-us'
                },
            ]
        },
        {
            title: 'Thể loại hàng đầu',
            links: [
                {
                    name: 'Hành động',
                    link: '/movies'
                },
                {
                    name: 'Lãng mạn',
                    link: '/movies'
                },
                {
                    name: 'Kịch tính',
                    link: '/movies'
                },
                {
                    name: 'Lịch sử',
                    link: '/movies'
                },
            ]
        },
        {
            title: 'Tài khoản của tôi',
            links: [
                {
                    name: 'Bảng điều khiển',
                    link: '/dashboard'
                },
                {
                    name: 'Yêu thích',
                    link: '/favorites'
                },
                {
                    name: 'Hồ sơ',
                    link: '/profile'
                },
                {
                    name: 'Đổi mật khẩu',
                    link: '/password'
                },
            ]
        }
    ]
    return (
        <div className='bg-dry py-4 bprder=t-2 border-black'>
            <div className='container mx-auto px-2'>
                <div className='grid grid-cols-2 md:grid-cols-6 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 sm:pl-5 px-2 py-10 justify-between'>
                    {Links.map((link, index) => (
                        <div key={index} className='col-span-1 md:col-span-3 lg:col-span-3 pb-3.5 sm:pb-0'>
                            <h3 className='text-md lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb-0.5'>
                                {link.title}
                            </h3>
                            <ul className='text-sm flex flex-col space-y-3'>
                                {link.links.map((text, index) => (
                                    <li key={index} className='flex items-baseline'>
                                        <Link to={text.link} className='text-border inline-block hover:text-subMain'>
                                            {text.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <div className='pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3'>
                        <Link to="/">
                            <img src='/images/logo.png' alt='logo' className='xl:w-2/4 2xl:w-2/4 md:w-3/4 lg:w-2/4 w-4/5 object-contain h-12'></img>
                        </Link>
                        <p className='leading-7 text-sm text-border mt-3'>
                            <span>
                                Địa chỉ: Đà Lạt, Lâm Đồng <br /> Việt Nam
                            </span>
                            <br />
                            <span>Điện thoại: 0123456789</span>
                            <br />
                            <span>Email: info@gmail.com</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer