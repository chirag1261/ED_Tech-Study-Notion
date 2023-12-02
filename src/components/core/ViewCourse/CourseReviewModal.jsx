import React from 'react'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import IconBtn from '../../common/IconBtn';
import { createRating } from '../../../services/operations/courseDetailsAPI';
import { AiOutlineClose } from 'react-icons/ai';
import ReactStars from 'react-rating-stars-component'

function CourseReviewModal({setReviewModal}) {
    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const {courseEntireData} = useSelector((state) => state.viewCourse);
    const {handleSubmit, register, formState: {errors}, setValue} = useForm();

    // console.log("User", user);
    
    async function onSubmit(data) {
        await createRating({ 
            courseId: courseEntireData._id, 
            rating: data.courseRating, 
            review: data.courseExperience
        }, token)

        setReviewModal(false);
    }

    function ratingChange(newRating) {
        setValue("courseRating", newRating);
    }

    useEffect(() => {
        setValue("courseExperience", "");
        setValue("courseRating", 0);
    }, []);

    return (
        <div className='fixed flex items-center justify-center inset-0 backdrop-blur-md overflow-auto'>
            <div className='bg-richblack-800 rounded-xl border border-richblack-400 w-[700px] mx-3'>
                {/* Modal header */}
                <div className='bg-richblack-700 flex justify-between items-center text-richblack-5 py-5 px-7 rounded-t-xl'>
                    <p className='text-xl'>Add Course Review</p>
                    <div onClick={() => setReviewModal(false)}>
                        <AiOutlineClose className='text-xl cursor-pointer'/>
                    </div>
                </div>

                {/* Modal Body */}
                <div className='flex flex-col w-full'>
                    <div className='flex mt-10 text-richblack-5 gap-3 w-full items-center justify-center'>
                        <div>
                            <img src={user?.image?.image_url} alt={user?.firstName} className='aspect-square w-[50px] rounded-full object-cover'/>
                        </div>

                        <div>
                            <p>{user?.firstName} {user?.lastName}</p>
                            <p className='text-sm'>Posting Publicly</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className='flex mt-6 flex-col items-center'>
                        <ReactStars
                            count={5}
                            onChange={ratingChange}
                            size={24}
                            activeColor="#FFD700"
                        />

                        <div className='w-full sm:px-12 px-5'>
                            <label htmlFor='courseExperience' className='text-richblack-5 text-sm tracking-wide'>Add Your Experience <sup className='text-pink-400'>*</sup></label>
                            <textarea id='courseExperience' placeholder='Add Your Experience Here' {...register("courseExperience", {required: true})} className='min-h-[130px] w-full mt-3 rounded-lg px-4 py-2 bg-richblack-700 outline-none text-richblack-5 border-b-2 border-richblack-400'/>
                            {
                                errors.courseExperience && (
                                    <span className='text-sm text-pink-300'>Please provide experience</span>
                                )
                            }
                        </div>

                        <div className='flex w-full items-center justify-end sm:px-12 px-5 my-5 gap-3'>
                            <button onClick={() => setReviewModal(false)} className='px-5 py-2 font-semibold bg-richblack-300 rounded-md'>Cancel</button>
                            <IconBtn text={"Save"} type={'submit'}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CourseReviewModal