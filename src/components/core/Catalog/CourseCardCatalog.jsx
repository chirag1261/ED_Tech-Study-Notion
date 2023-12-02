import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import GetAvgRating from '../../../utils/avgRating'
import RatingStars from '../../../components/common/RatingStars'

function CourseCardCatalog({course, height}) {
    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(course?.ratingAndReviews);
        setAvgReviewCount(count);
    }, [course]);

    return (
        <div>
            <Link to={`/courses/${course?._id}`} className='flex flex-col gap-3'>
                <div>
                    <img src={course?.thumbnail?.url} alt='' className={`${height} w-full rounded-xl object-cover`}/>
                </div>

                <div className='flex flex-col gap-2'>
                    <p className='text-xl font-semibold'>{course?.courseName}</p>
                    <p className='text-richblack-300'>By {course?.instructor?.firstName} {' '} {course?.instructor?.lastName}</p>
                    <div className='flex gap-3 items-center'>
                        <span className='text-yellow-25'>{avgReviewCount || 0}</span>
                        <RatingStars Review_Count={avgReviewCount}/>
                        <span className='text-richblack-400 tracking-wide'>{course?.ratingAndReviews?.length} Ratings</span>
                    </div>
                    <p className='text-lg text-richblack-5 tracking-wide'>Rs. {course?.price}</p>
                </div>
            </Link>
        </div>
    )
}

export default CourseCardCatalog