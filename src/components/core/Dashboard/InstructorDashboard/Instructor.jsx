import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import Loader from '../../../common/Loader';
import { Link } from 'react-router-dom';
import InstructorChart from './InstructorChart';

function Instructor() {
    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([]);
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);

    useEffect(() => {
        async function getCourseDataWithStats() {
            setLoading(true);
            const instructorApiData = await getInstructorData(token);
            const result = await fetchInstructorCourses(token);

            if(instructorApiData.length) {
                setInstructorData(instructorApiData);
            }

            if(result) {
                setCourses(result);
            }

            setLoading(false);
        }

        getCourseDataWithStats();
    }, []);

    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0);
    const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0);

    return (
        <div className='text-white'>   
            <div>
                <p className='text-2xl text-richblack-5 font-semibold'>Hi {user?.firstName} 👋</p>
                <p className='text-sm text-richblack-300 tracking-wider'>Let's start something new</p>
            </div>

            {
                loading ? <div className='flex items-center justify-center min-h-[100vh]'> <Loader /> </div> :
                courses?.length > 0 ? 
                <div>
                    <div className='flex lg:flex-row flex-col gap-3 w-full mt-5'>
                        {
                            courses?.length > 0 &&
                            <div className='bg-richblack-800 p-7 rounded-lg lg:w-[75%]'>
                                <InstructorChart courses={instructorData}/>
                            </div>
                        }

                        <div className='bg-richblack-800 pt-6 lg:w-[25%] rounded-lg px-4'>
                            <p className='text-richblack-5 font-bold text-2xl mb-5'>Statstics</p>
                            
                            <div className='flex lg:flex-col flex-row flex-wrap gap-5 pb-5'>
                                <div>
                                    <p className='sm:text-xl text-lg text-richblack-300 font-bold'>Total Courses</p>
                                    <p className='sm:text-2xl text-lg text-richblack-50 font-bold'>{courses?.length}</p>
                                </div>
                                
                                <div>
                                    <p className='sm:text-xl text-lg text-richblack-300 font-bold'>Total Students</p>
                                    <p className='sm:text-2xl text-lg text-richblack-50 font-bold'>{totalStudents}</p>
                                </div>

                                <div>
                                    <p className='sm:text-xl text-lg text-richblack-300 font-bold'>Total Income</p>
                                    <p className='sm:text-2xl text-lg text-richblack-50 font-bold'>{totalAmount}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='mt-5 px-5 py-4 bg-richblack-800 rounded-lg'>
                        <div className='flex w-full justify-between items-center'>
                            <p className='text-richblack-5 text-lg font-semibold'>Your Courses</p>
                            <Link to={"/dashboard/my-courses"} className='text-yellow-50 tracking-wide text-sm'>View All</Link>
                        </div>

                        {/* Render 3 courses */}
                        <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-5'>
                            {
                                courses?.slice(0, 3)?.map((course, index) => (
                                    <div key={index}>
                                        <img src={course?.thumbnail?.url} className='w-full h-[200px] object-cover rounded-sm'/>
                                        <div className='my-3'>
                                            <p className='text-richblack-50 font-semibold'>{course?.courseName}</p>
                                            <div className='flex gap-2 items-center text-richblack-400 text-sm'>
                                                <p>{course?.studentEnrolled?.length || 0}</p>
                                                <p> | </p>
                                                <p>Rs. {course?.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                :
                <div>
                    <p>You have not created any courses yet!</p>
                    <Link to={"/dashboard/addCourse"}>
                        Create a Course
                    </Link>
                </div>
            }
        </div>
    )
}

export default Instructor