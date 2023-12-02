import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../../common/IconBtn'
import { resetCourseState, setStep } from '../../../../../slices/courseSlice'
import { COURSE_STATUS } from '../../../../../utils/constants'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';

function PublishCourseForm() {
    const {register, handleSubmit, setValue, getValues} = useForm();
    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(course?.status === COURSE_STATUS.PUBLISHED) {
            setValue("public", true);
        }
    }, []);

    function  goToCourses() {
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses");
    }

    async function handleCoursePublish() {
        if( (course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) 
            || (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false) ) {
            //no updation so no make api CAll
            goToCourses();
            return;
        }

        //When hmne tick marr diya toh getValues me true ho jayega && course ka status draft me h || hamne tick hata diya && course ka status published ho 
        const formData = new FormData();
        formData.append("courseId", course?._id);
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append("status", courseStatus);

        setLoading(true);
        const result = await editCourseDetails(formData, token);
        if(result) {
            goToCourses();
        }

        setLoading(false);
    }

    function onSubmit(data)  {
        handleCoursePublish();
    }

    function goBack() {
        dispatch(setStep(2));
    }

    return (
        <div className='rounded-md border-[1px] bg-richblack-800 p-6 border-richblack-700 text-richblack-5'>
            <p className='text-3xl font-semibold'>Publish Course</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor='public' className='flex gap-3 items-center mt-10 cursor-pointer w-fit'>
                        <input
                            type='checkbox'
                            id='public'
                            {...register("public")}
                            className='rounded-md h-4 w-4 cursor-pointer'
                        />
                        Make this course as Public
                    </label>
                </div>

                <div className='flex gap-3 justify-end mt-10'>
                    <button disabled={loading} type='button' onClick={goBack} className='px-4 py-2 bg-richblack-600 rounded-md'>
                        Back
                    </button>
                    <IconBtn text={"Save Changes"} disabled={loading}/>
                </div>
            </form>

        </div>
    )
}

export default PublishCourseForm