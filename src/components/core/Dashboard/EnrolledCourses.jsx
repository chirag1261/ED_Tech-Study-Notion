import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../common/Loader';
import ProgressBar from '@ramonak/react-progress-bar';
import { fetchUserEnrolledCourses } from '../../../services/operations/profileAPI';
import { duration } from '../../../utils/courseDuration';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function EnrolledCourses() {
    const { token } = useSelector((state) => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const getEnrolledCourses = async() => {
        setLoading(true);
        const toastId = toast.loading("Getting enrolled courses...");

        try{
            const response = await fetchUserEnrolledCourses(token);
            setEnrolledCourses(response);
        }
        catch(error) {
            console.log("Unable to Fetch Enrolled Courses");
        }

        setLoading(false);
        toast.dismiss(toastId);
    }

    useEffect(()=> {
        getEnrolledCourses();
    }, []);
  
    function subSectionDurationHandle(course) {
        let totalDuration = 0;
    
        for (const section of course?.courseContent) {
    
            for (const subSection of section?.subSection || []) {
                totalDuration += parseFloat(subSection.timeDuration) || 0;
            }
        }
        
        return duration(totalDuration);
    }

    return (
        <div className='text-white py-5 pb-10'>
            <div className='text-richblack-100 text-3xl tracking-wide'>Enrolled Courses</div>
            {
                loading && <div className='flex items-center justify-center min-h-[100vh]'> <Loader /> </div>
            }

            {
                !loading && enrolledCourses.length === 0 ? (
                    <p className='text-center text-richblack-5 mt-5 tracking-wider'>You have not enrolled in any course yet</p>
                ) : 
                <div className='mt-10'>
                    <div className='bg-richblack-700 justify-between flex px-5 py-3 rounded-t-md text-sm text-richblack-25'>
                        <p className='max-w-[500px]'>Course Name</p>
                        
                        <div className='gap-28 items-center mr-[13.4rem] min-[1000px]:flex hidden'>
                            <p className='max-w-[200px]'>Durations</p>
                            <p>Progress</p>
                        </div>
                    </div>
                    {   enrolledCourses.map((course, index) => (
                        <div key={index} className='min-[1080px]:block flex flex-col border border-richblack-700  p-5 '>
                            <div className='relative flex items-center justify-between'>
                                <div className='flex gap-5 items-center w-full cursor-pointer' onClick={() => {
                                    navigate(`/view-course/${course?._id}/section/${course?.courseContent?.[0]?._id}/sub-section/${course?.courseContent?.[0]?.subSection?.[0]?._id}`)
                                }}>
                                    <img src={course?.thumbnail?.url} alt='' className='w-[52px] h-[52px]' />
                                    <div className='flex flex-col place-self-start text-sm gap-2'>
                                        <p className='text-richblack-5'>{course.courseName}</p>
                                        <p className='text-richblack-100'>{course.courseDescription}</p>
                                    </div>
                                </div>

                                <div className='flex items-center gap-10'>
                                    <div className='gap-28 items-center min-[1000px]:flex hidden'>
                                        <div className='max-w-[200px] text-sm tracking-wide text-richblack-100'>
                                            {subSectionDurationHandle(course)}
                                        </div>

                                        <div className='w-[200px] mr-[4.5rem]'>
                                            <p className='text-xs text-richblack-100 tracking-wider'>Progress: {course.progressPercentage || 0}%</p>
                                            <ProgressBar
                                                completed={course.progressPercentage || 0}
                                                height='8px'
                                                isLabelVisible={false}
                                                className='mt-2'
                                                bgColor='#A020F0'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='h-[1px] bg-richblack-700 my-3 mx-20 min-[1000px]:hidden block'></div>

                            <div className='min-[450px]:gap-24 gap-14 items-center min-[1000px]:hidden flex justify-center'>
                                <div className='text-sm w-[120px] tracking-wide text-richblack-100'>
                                    {subSectionDurationHandle(course)}
                                </div>

                                <div className='w-[200px]'>
                                    <p className='text-[10px] text-richblack-100 tracking-wider'>Progress: {course.progressPercentage || 0}%</p>
                                    <div>
                                        <ProgressBar
                                            completed={course.progressPercentage || 0}
                                            height='8px'
                                            isLabelVisible={false}
                                            className='mt-2'
                                            bgColor='#A020F0'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}

export default EnrolledCourses;
