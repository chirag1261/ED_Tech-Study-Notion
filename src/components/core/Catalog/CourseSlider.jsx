import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper'
import CourseCardCatalog from './CourseCardCatalog'
import "swiper/css";
import "swiper/css/pagination";

function CourseSlider({courses}) {
    return (
        <>
            {
                courses?.length ? (
                    <Swiper slidesPerView={1} spaceBetween={25} modules={[Pagination, Autoplay, Navigation]} pagination={{dynamicBullets: true }} 
                        className='mySwiper pb-10' autoplay={{delay: 3000, disableOnInteraction: false}} navigation={true} breakpoints={{1024: {slidesPerView: 3,}, 700: {slidesPerView: 2}}}>
                        {
                            courses?.map((course, index) => (
                                <SwiperSlide key={index}>
                                    <CourseCardCatalog course={course} height={"h-[250px]"}/>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                ) : (<p>No Courses Found</p>)
            }   
        </>
    )
}

export default CourseSlider