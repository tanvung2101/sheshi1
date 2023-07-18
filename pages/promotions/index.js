import { Button, SEO } from '@/components';
import dynamic from 'next/dynamic'
const NavbarUser = dynamic(() => import('../../components/NavbarUser'), {
    ssr: false,
    // loading: () => <p>Loading...</p>,
})
// import NavbarUser from '@/components/NavbarUser'
import Head from 'next/head';
import Image from 'next/image';
import React from 'react'
import { GrNext, GrPrevious } from 'react-icons/gr';
import Slider from 'react-slick';
import qr from './../../public/imghome/qrcode.png'

const PagePromotions = () => {
    const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
        <div {...props}>
            <GrPrevious></GrPrevious>
        </div>
    );
    const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
        <div {...props}>
            <GrNext></GrNext>
        </div>
    );
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        // prevArrow: <SlickArrowLeft />,
        // nextArrow: <SlickArrowRight />,
        responsive: [
            {
                breakpoint: 1198,
                settings: {
                    infinite: true,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    rows: 1,
                    dots: false,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    rows: 1,
                    dots: false,
                },
            },
        ],
    };
    return (

        <>
            <SEO title='Khuyến Mãi'></SEO>
            <NavbarUser >
                <div className="w-[75%] flex-col items-start">
                    <h3 className='text-center text-2xl mb-10'>Khuyến mãi dành cho bạn</h3>
                    <div className='w-full'>
                        <Slider {...settings}>
                            <div className='bg-white shadow-lg'>
                                <div className='flex items-center justify-center gap-3 w-full h-[120px] '>
                                    <div className='w-24 h-24 bg-red-400'>
                                        <Image src={qr.src} alt='' width={80} height={80} className='w-full h-full object-contain' />
                                    </div>
                                    <div className='flex flex-col items-start justify-center gap-2'>
                                        <p className='uppercase font-bold'>tri ân khách hàng</p>
                                        <button className='px-2 pt-1 pb-2 text-white text-sm bg-regal-red rounded-md'>Chi tiết</button>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white shadow-lg'>
                                <div className='flex items-center justify-center gap-3 w-full h-[120px] '>
                                    <div className='w-24 h-24 bg-red-400'>
                                        <Image src={qr.src} alt='' width={80} height={80} className='w-full h-full object-contain' />
                                    </div>
                                    <div className='flex flex-col items-start justify-center gap-2'>
                                        <p className='uppercase font-bold'>Mã giảm giá 20k</p>
                                        <button className='px-2 pt-1 pb-2 text-white text-sm bg-regal-red rounded-md'>Chi tiết</button>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white shadow-lg'>
                                <div className='flex items-center justify-center gap-3 w-full h-[120px] '>
                                    <div className='w-24 h-24 bg-red-400'>
                                        <Image src={qr.src} alt='' width={80} height={80} className='w-full h-full object-contain' />
                                    </div>
                                    <div className='flex flex-col items-start justify-center gap-2'>
                                        <p className='uppercase font-bold'>Mã giảm giá 50%</p>
                                        <button className='px-2 pt-1 pb-2 text-white text-sm bg-regal-red rounded-md'>Chi tiết</button>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white shadow-lg'>
                                <div className='flex items-center justify-center gap-3 w-full h-[120px] '>
                                    <div className='w-24 h-24 bg-red-400'>
                                        <Image src={qr.src} alt='' width={80} height={80} className='w-full h-full object-contain' />
                                    </div>
                                    <div className='flex flex-col items-start justify-center gap-2'>
                                        <p className='uppercase font-bold'>Mã giảm giá 50%</p>
                                        <button className='px-2 pt-1 pb-2 text-white text-sm bg-regal-red rounded-md'>Chi tiết</button>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white shadow-lg'>
                                <div className='flex items-center justify-center gap-3 w-full h-[120px] '>
                                    <div className='w-24 h-24 bg-red-400'>
                                        <Image src={qr.src} alt='' width={80} height={80} className='w-full h-full object-contain' />
                                    </div>
                                    <div className='flex flex-col items-start justify-center gap-2'>
                                        <p className='uppercase font-bold'>Mã giảm giá 50%</p>
                                        <button className='px-2 pt-1 pb-2 text-white text-sm bg-regal-red rounded-md'>Chi tiết</button>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white shadow-lg'>
                                <div className='flex items-center justify-center gap-3 w-full h-[120px] '>
                                    <div className='w-24 h-24 bg-red-400'>
                                        <Image src={qr.src} alt='' width={80} height={80} className='w-full h-full object-contain' />
                                    </div>
                                    <div className='flex flex-col items-start justify-center gap-2'>
                                        <p className='uppercase font-bold'>Mã giảm giá 50%</p>
                                        <button className='px-2 pt-1 pb-2 text-white text-sm bg-regal-red rounded-md'>Chi tiết</button>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </NavbarUser>
        </>
    )
}

export default PagePromotions