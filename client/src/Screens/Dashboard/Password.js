import React from 'react'
import SideBar from './SideBar'
import { Input } from '../../Components/UsedInputs'

function Password() {
    return (
        <SideBar>
            <div className='flex flex-col gap-6'>
                <h2 className='text-xl font-bold'>Đổi mật khẩu</h2>
                <Input
                    label='Mật khẩu cũ'
                    placeholder='Nhập mật khẩu cũ'
                    type='password'
                    bg={true}
                />
                <Input
                    label='Mật khẩu mới'
                    placeholder='Nhập mật khẩu mới'
                    type='password'
                    bg={true}
                />
                <Input
                    label='Nhập lại mật khẩu mới'
                    placeholder='Nhập lại mật khẩu mới'
                    type='password'
                    bg={true}
                />
                <div className='flex justify-end items-center my-4'>
                    <button className='bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto'>
                        Xác nhận
                    </button>
                </div>
            </div>
        </SideBar>
    )
}

export default Password