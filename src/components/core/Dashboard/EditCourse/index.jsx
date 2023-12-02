import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderSteps from '../AddCourse/RenderSteps'
import Loader from '../../../common/Loader';
import { useEffect } from 'react';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';

function EditCourse() {
    const dispatch = useDispatch();
    const {courseId} = useParams();
    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const populateCourseDetails = async() => {
            setLoading(true);
            const result = await getFullDetailsOfCourse(courseId, token);
            if(result) {
                dispatch(setEditCourse(true))
                dispatch(setCourse(result?.courseDetails));
            }

            setLoading(false);
        }

        populateCourseDetails();
    }, []);

    // console.log(course);

    if(loading) {
        return (<div className='min-h-[80vh] flex items-center justify-center'><Loader/></div>)
    }
    return (
        <div className='text-richblack-5'>
            <p className='text-3xl font-semibold'>Edit Course</p>
            <div className='max-w-[580px] mx-auto'>
                {
                    course ? (<RenderSteps/>) : <p>Course Not Found</p>
                }
            </div>
        </div>
    )
}

export default EditCourse