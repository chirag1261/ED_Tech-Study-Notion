import React from 'react'
import IconBtn from '../../../common/IconBtn'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { useEffect } from 'react';
import CourseTable from './CourseTable';
import { HiOutlinePlus } from 'react-icons/hi2';
import { resetCourseState } from '../../../../slices/courseSlice';

function MyCourses() {
    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [courses, setCourses] = useState(null);

    const getCourses = async() => {
        try{
            const response = await fetchInstructorCourses(token);
            setCourses(response);
        }
        catch(error) {
            console.log("Unable to Fetch Enrolled Courses");
        }
    }

    useEffect(()=> {
        getCourses();
        dispatch(resetCourseState());
    },[]);

    // console.log(courses)

    return (
        <div className='text-white pt-5 pb-10'>
            <div className='flex justify-between min-[400px]:flex-row flex-col items-center gap-3'>
                <p className='text-richblack-5 text-3xl font-semibold'>My Courses</p>
                <IconBtn text={"Add Courses"} onclick={() => navigate("/dashboard/add-course")}>
                    <HiOutlinePlus/>
                </IconBtn>
            </div>

            { courses && <CourseTable courses={courses} setCourses={setCourses} />}
        </div>
    )
}

export default MyCourses