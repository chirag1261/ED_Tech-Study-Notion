import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { removeFromCart } from '../../../../slices/cartSlice'
import RatingStars from '../../../common/RatingStars'

function RenderCartCourses() {
    const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    return (
        <div className=''>
            {
                cart.map((course, index) => (
                    <div key={index} className=''>
                        <div className='flex justify-between px-5 pt-5 lg:flex-row flex-col gap-4 lg:gap-1'>
                            <div className='flex gap-3 sm:items-center sm:flex-row flex-col'>
                                <img src={course?.thumbnail?.url} alt='' className='sm:max-w-[185px] min-h-[148px] rounded-lg'/>

                                <div className='flex flex-col gap-2'>
                                    <p>{course?.courseName}</p>
                                    <p className='text-richblack-100'>{course?.category?.name}</p>
                                    <div className='flex items-center gap-2'>
                                        <p className='text-yellow-50'>4</p>
                                        
                                        <RatingStars Review_Count={4} Star_Size={20}/>
                                        
                                        <p className='text-richblack-300 text-sm'>(5 Review Count)</p>
                                    </div>

                                    {/* <span>{course?.ratingAndReviews?.length} Ratings</span> */}
                                    <p className='text-richblack-300 text-sm tracking-wider'>Total Courses • Lesson • Beginner</p>
                                </div>
                            </div>

                            <div className='flex flex-col text-lg items-center'>
                                <button onClick={() => dispatch(removeFromCart(course?._id))} className='flex items-center gap-2 text-pink-300 py-2 px-3 bg-richblack-700 rounded-lg w-full'>
                                    <RiDeleteBin6Line/>
                                    <span>Remove</span>
                                </button>

                                <p className='text-yellow-100 text-2xl font-semibold mt-5'>Rs. {course?.price}</p>
                            </div>
                        </div>
                        
                        <hr className='mt-5 text-richblack-700'/>
                    </div>
                ))
            }

        </div>
    )
}

export default RenderCartCourses