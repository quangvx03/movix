import React from 'react'
import MainModal from './MainModal'
import { Input } from '../UsedInputs'
import Uploder from '../Uploder'

function CastsModal({ modalOpen, setModalOpen, cast }) {
    return (
        <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <div className='inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl'>
                <h2 className='text-3xl font-bold'>{cast ? "Cập nhật" : "Thêm mới"}</h2>
                <form className='flex flex-col gap-6 text-left mt-6'>
                    <Input
                        label='Tên diễn viên'
                        placeholder={cast ? cast.name : 'Nhập tên diễn viên'}
                        type='text'
                        bg={false}
                    />
                    <div className='flex flex-col gap-2'>
                        <p className='text-border font-semibold text-sm'>
                            Hình ảnh
                        </p>
                        <Uploder />
                        <div className='w-32 h-32 p-2 bg-main border border-border rounded'>
                            <img
                                src={`/images/casts/${cast ? cast.image : 'user.png'}`}
                                alt={cast?.name}
                                className='w-full h-full object-cover rounded' />
                        </div>
                    </div>
                    <button
                        onClick={() => setModalOpen(false)}
                        className='w-full flex-colo py-3 font-bold transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white'>
                        {
                            cast ? "Cập nhật" : "Thêm"
                        }
                    </button>
                </form>
            </div>
        </MainModal>
    )
}

export default CastsModal