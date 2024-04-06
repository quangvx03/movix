import React from 'react'
import Layout from './../Layout/Layout';
import Head from '../Components/Head';

function AboutUs() {
    return (
        <Layout>
            <div className='min-height-screen container mx-auto px-2 my-6'>
                <Head title='Giới thiệu' />
                <div className='xl:py-20 py-10 px-4'>
                    <div className='grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center'>
                        <div>
                            <div className='mt-10 lg:mt-0'>
                                <img src='/images/about2.png'
                                    alt='aboutus'
                                    className='w-full xl:block hidden h-header rounded-lg object-cover' />
                            </div>
                        </div>
                        <div>
                            <h3 className='text-xl lg:text-3xl mb-4 font-semibold'>
                                Chào mừng đến với Movix
                            </h3>
                            <div className='mt-3 text-sm leading-8 text-text'>
                                <p>
                                    Movix tự hào là điểm đến lý tưởng cho những người yêu điện ảnh, nơi bạn có thể dễ dàng khám phá và thưởng thức hàng ngàn bộ phim từ mọi thể loại và quốc gia. Với giao diện người dùng thân thiện và dễ sử dụng, Movix giúp bạn tìm kiếm, chọn lựa và xem những bộ phim ưa thích một cách thuận tiện và linh hoạt nhất. Từ những bộ phim bom tấn đình đám đến những tác phẩm điện ảnh độc đáo và thú vị, Movix mang đến cho bạn trải nghiệm điện ảnh đầy phong phú và đa dạng.
                                </p>
                                <p>
                                    Bạn có thể thoải mái thưởng thức các bộ phim mà không bị giới hạn bởi thời gian hoặc địa điểm, chỉ cần một kết nối internet là bạn có thể bắt đầu hành trình khám phá thế giới điện ảnh của mình. Đến với Movix, bạn sẽ luôn có những khoảnh khắc thú vị và hấp dẫn bên cạnh những bộ phim tuyệt với nhất.
                                </p>
                            </div>
                            <div className='grid md:grid-cols-2 gap-6 mt-8'>
                                <div className='p-8 bg-dry rounded-lg'>
                                    <span className='text-3xl block font-extrabold'>
                                        10K
                                    </span>
                                    <h4 className='text-lg font-semibold my-2'>
                                        Phim được liệt kê
                                    </h4>
                                    <p className='mb-0 text-text leading-7 text-sm'>
                                        Thư viện phim được cập nhật liên tục, mang đến cho bạn kho tàng phim đa dạng, phong phú, thuộc mọi thể loại.
                                    </p>
                                </div>
                                <div className='p-8 bg-dry rounded-lg'>
                                    <span className='text-3xl block font-extrabold'>
                                        10K
                                    </span>
                                    <h4 className='text-lg font-semibold my-2'>
                                        Người dùng yêu quý
                                    </h4>
                                    <p className='mb-0 text-text leading-7 text-sm'>
                                        Hoàn toàn miễn phí, không cần đăng ký!
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AboutUs