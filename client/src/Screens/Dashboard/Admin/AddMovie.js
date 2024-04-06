import React, { useEffect, useState } from 'react'
import SideBar from './../SideBar';
import { Input, Message, Select } from './../../../Components/UsedInputs';
import Uploder from './../../../Components/Uploder';
import { CategoriesData } from './../../../Data/CategoriesData';
import { UsersData } from '../../../Data/MovieData';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { ImUpload } from 'react-icons/im';
import CastsModal from '../../../Components/Modals/CastsModal';

function AddMovie() {
    const [modalOpen, setModalOpen] = useState(false)
    const [cast, setCast] = useState(null)

    useEffect(() => {
        if (modalOpen === false) {
            setCast();
        }
    }, [modalOpen])

    return (
        <SideBar>
            <CastsModal modalOpen={modalOpen} setModalOpen={setModalOpen} cast={cast} />
            <div className='flex flex-col gap-6'>
                <h2 className='text-xl font-bold'>Thêm phim</h2>
                <div className='w-full grid md:grid-cols-2 gap-6'>
                    <Input
                        label='Tiêu đề phim'
                        placeholder='Nhập tiêu đề của phim'
                        type='text'
                        bg={true}
                    />
                    <Input
                        label='Thời lượng'
                        placeholder='Nhập thời lượng'
                        type='text'
                        bg={true}
                    />
                </div>
                <div className='w-full grid md:grid-cols-2 gap-6'>
                    <Input
                        label='Ngôn ngữ'
                        placeholder='Nhập ngôn ngữ'
                        type='text'
                        bg={true}
                    />
                    <Input
                        label='Năm phát hành'
                        placeholder='Nhập năm phát hành phim'
                        type='number'
                        bg={true}
                    />
                </div>
                {/* image */}
                <div className='w-full grid md:grid-cols-2 gap-6'>
                    {/* image without title */}
                    <div className='flex flex-col gap-2'>
                        <p className='text-border font-semibold text-sm'>
                            Ảnh không có tiêu đề
                        </p>
                        <Uploder />
                        <div className='w-32 h-32 p-2 bg-main border border-border rounded'>
                            <img
                                src='/images/movies/22.jpg'
                                alt=''
                                className='w-full h-full object-cover rounded' />
                        </div>
                    </div>
                    {/* image with title */}
                    <div className='flex flex-col gap-2'>
                        <p className='text-border font-semibold text-sm'>
                            Ảnh có tiêu đề
                        </p>
                        <Uploder />
                        <div className='w-32 h-32 p-2 bg-main border border-border rounded'>
                            <img
                                src='/images/movies/2.jpg'
                                alt=''
                                className='w-full h-full object-cover rounded' />
                        </div>
                    </div>
                </div>
                {/* des */}
                <Message label='Mô tả' placeholder='Giới thiệu về phim' />
                {/* cat */}
                <div className='text-sm w-full'>
                    <Select label='Thể loại' options={CategoriesData} />
                </div>
                {/* video */}
                <div className='flex flex-col gap-2 w-full'>
                    <label className='text-border font-semibold text-sm'>
                        Video phim
                    </label>
                    <Uploder />
                </div>
                {/* casts */}
                <div className='w-full grid lg:grid-cols-3 gap-6 items-start'>
                    <button
                        onClick={() => setModalOpen(true)}
                        className='w-full py-4 bg-main border border-subMain text-white rounded px-2'>
                        Thêm diễn viên
                    </button>
                    <div className='grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4 grid-cols-2 gap-4 col-span-2'>
                        {UsersData.map((user, i) => (
                            <div
                                key={i}
                                className='p-2 italic text-xs rounded flex-colo bg-main border border-border'>
                                <img
                                    src={`/images/casts/${user.image ? user.image : "user.png"}`}
                                    alt={user.name}
                                    className='w-full h-24 object-cover rounded mb-2' />
                                <p>{user.name}</p>
                                <div className='flex-rows mt-2 w-full gap-2'>
                                    <button
                                        onClick={() => {
                                            setCast(user)
                                            setModalOpen(true)
                                        }
                                        }
                                        className='w-6 h-6 flex-colo bg-dry border border-border text-green-600 rounded'>
                                        <FaEdit />
                                    </button>
                                    <button className='w-6 h-6 flex-colo bg-dry border border-border text-subMain rounded'>
                                        <MdDelete />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* submit */}
                <button className='bg-subMain w-full flex-rows gap-6 font-medium transitions hover:bg-dry border border-subMain text-white py-4 rounded'>
                    <ImUpload /> Tải lên
                </button>
            </div>
        </SideBar>
    )
}

export default AddMovie