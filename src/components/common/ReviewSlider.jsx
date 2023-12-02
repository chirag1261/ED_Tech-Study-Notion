import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import ReactStarts from 'react-rating-stars-component';
import { apiConnector } from '../../services/apiConnector';
import {ratingsEndpoints} from '../../services/api'
import { toast } from 'react-hot-toast';
import {FaStar} from 'react-icons/fa'

function ReviewSlider() {
    const [reviews, setReviews] = useState([]);
    const truncateWords = 15;

    useEffect(() => {
        async function fetchAllReviews() {
            const response = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API);
            // console.log("Review Response", response);

            if(!response?.data?.success) {
                toast.error("Can't fetch");
            }

            setReviews(response?.data?.allReviews)
        }

        fetchAllReviews();
    }, []);

    return (
        <>
            {
                reviews?.length > 0 &&
                <div className='text-richblack-5 mt-10 border'>    
                    <p className='text-center sm:text-4xl text-2xl font-semibold mt-10'>Reviews From Other Learners</p>

                    <div className='h-[190px] max-w-maxContent px-3'>
                        <Swiper slidesPerView={1} spaceBetween={24} loop={true} autoplay={{delay: 2500}} modules={[Pagination, Autoplay]} 
                            pagination={{dynamicBullets: true }} className='w-full pb-10' breakpoints={{1024: {slidesPerView: 4,}, 700: {slidesPerView: 2}}}>
                            {
                                reviews?.map((review, index) => (
                                    <SwiperSlide key={index} className='bg-richblack-800 p-3 border border-richblack-600'>
                                        <div className='flex gap-4 items-center'>
                                            <img src={review?.user?.image?.image_url} className='h-9 w-9 object-cover rounded-full'/>

                                            <div className='flex flex-col text-xs text-richblack-100'>
                                                <p className='text-richblack-5 text-sm'>{review?.course?.courseName}</p>
                                                <p>{review?.user?.firstName} {review?.user?.lastName}</p>
                                            </div>
                                        </div>

                                        <p className='mt-4 text-sm'>
                                        { 
                                            review?.review > truncateWords ? 
                                            `${review?.review?.split(" ").slice(0, truncateWords).join(" ")}...` : 
                                            review?.review 
                                        }
                                        </p>

                                        <div className='mt-4 text-sm flex gap-2 items-center'>
                                            <p className='text-yellow-50'>{review?.rating.toFixed(1) || 0}</p>
                                            <div>
                                                <ReactStarts 
                                                    count={5}
                                                    value={review?.rating}
                                                    size={20}
                                                    edit={false}
                                                    activeColor={"#FFD700"}
                                                    emptyIcon={<FaStar/>}
                                                    fullIcon={<FaStar/>}
                                                />
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
                </div>
            }
        </>
        
    )
}

export default ReviewSlider