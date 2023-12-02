import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseEntireData, setCourseSectionData, setTotalNoOfLectures } from '../slices/viewCourseSlice'
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';
import ViewCourseNavbar from '../components/core/ViewCourse/ViewCourseNavbar';
import Error from './Error';

function ViewCourse() {
    const [reviewModal, setReviewModal] = useState(false);
    const {courseId } = useParams();
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [error, setError] = useState(false); // Track error status

    const [navbar, setNavbar] = useState(true);

    useEffect(() => {
        const setCourseSpecificDetails = async() => {
            const courseData = await getFullDetailsOfCourse(courseId, token);

            if(courseData?.success === false) {
                setError(true);
                return;
            }

            dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
            dispatch(setCourseEntireData(courseData?.courseDetails));
            dispatch(setCompletedLectures(courseData.completedVideos));

            let lectures = 0;
            courseData?.courseDetails?.courseContent?.forEach((section) => {
                lectures += section?.subSection.length;
            })

            dispatch(setTotalNoOfLectures(lectures));
        }

        setCourseSpecificDetails();        
    }, []);

    if(error) {
        return (<Error/>)
    }

    return (
        <>
            <div className='flex min-h-[100vh]'>
                <div className='lg:block hidden'>
                    <VideoDetailsSidebar setReviewModal={setReviewModal} navbar={navbar}/>
                </div>

                <div className={`lg:hidden block fixed left-0 top-0 bottom-0 transform transition-all duration-300 ${navbar ? 'translate-x-0' : '-translate-x-full'} z-[10]`}>
                    <VideoDetailsSidebar setReviewModal={setReviewModal} navbar={navbar}/>
                </div>

                <div className={`lg:hidden ${navbar ? 'block' : 'hidden'} z-[5] backdrop-blur-sm absolute inset-0`} onClick={() => setNavbar(false)}></div>

                <div className='h-[100vh] overflow-auto w-full flex flex-col'>
                    <ViewCourseNavbar  navbar={navbar} setNavbar={setNavbar}/>
                    <Outlet/>
                </div>
            </div>
                
            {
                reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>
            }
        </>
    )
}

export default ViewCourse