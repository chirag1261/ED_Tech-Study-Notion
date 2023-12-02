import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { IoChevronBackOutline } from 'react-icons/io5';
import { AiOutlineDown } from 'react-icons/ai';

function VideoDetailsSidebar({setReviewModal, navbar}) {
    
    const [activeStatus, setActiveStatus] = useState("");     //current section Id
    const [videoBarActive, setVideoBarActive] = useState("");    //currrect SubsectionId
    const navigate = useNavigate();
    const {sectionId, subSectionId} = useParams();
    const { courseSectionData, courseEntireData, totalNoOfLectures, completedLectures} = useSelector((state) => state.viewCourse);
    const location = useLocation();

    useEffect(() => {
        function setActiveFlags() {
            if(!courseSectionData?.length) {
                return;
            }

            const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.findIndex((data) => data._id === subSectionId);
            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;

            //Set currect section and subsection Here
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            setVideoBarActive(activeSubSectionId)
        }
        
        setActiveFlags();
    }, [courseSectionData, courseEntireData, location.pathname])

    return (
        <>
            <div className={`text-white bg-richblack-800 lg:w-[320px] w-[270px] ${navbar ? 'block' : 'hidden'} h-full`}>
                {/* For buttons and headings */}
                <div>
                    {/* For Buttons */}
                    <div className='flex gap-3 items-center w-full justify-between px-5 py-3 pt-5'>
                        <div onClick={() => navigate("/dashboard/enrolled-courses")} className='bg-richblack-100 font-bold p-1 text-richblack-700 text-2xl rounded-full flex items-center justify-center cursor-pointer'>
                            <IoChevronBackOutline/>
                        </div>

                        <div>
                            <IconBtn text={"Add Review"} onclick={() => setReviewModal(true)}/>
                        </div>
                    </div>

                    {/* For Heading */}
                    <div className='px-5 mt-3'>
                        <p className='text-lg font-bold text-richblack-25'>{courseEntireData?.courseName}</p>
                        <p className='text-richblack-300 tracking-wider text-sm'>{completedLectures?.length} / {totalNoOfLectures}</p>
                    </div>

                    <hr className='border-richblack-600 mx-5 mt-5 mb-2'/>
                </div>

                {/* FOr section and subsection */}
                <div>
                    {
                        courseSectionData?.map((section, index) => (
                            <div key={index} onClick={() => setActiveStatus(section?._id)} className='mt-1'>
                                {/* Section */}
                                <div className='px-5 py-4 bg-richblack-600 flex justify-between items-center cursor-pointer'>
                                    <p>{section?.sectionName}</p>
                                    <div>
                                        <AiOutlineDown className={`text-xl text-richblack-400 
                                            ${activeStatus === section?._id ? 'transform rotate-180' : 'transform rotate-0'}  transition-all duration-300`}/>
                                    </div>
                                </div>

                                {/* Subsection */}
                                <div>
                                    {
                                        activeStatus === section?._id &&
                                        <div>
                                            {
                                                section?.subSection?.map((lecture, index) => (
                                                    <div key={index} className={`${videoBarActive === lecture?._id ? 'bg-yellow-200 text-richblack-900' : 'bg-richblack-800 text-white hover:bg-richblack-900 mr-[0.1rem]'} flex gap-3 py-3 px-5 items-center cursor-pointer`} onClick={() => {
                                                        navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${lecture?._id}`);
                                                        setVideoBarActive(lecture?._id);
                                                    }}>
                                                        <input type='checkbox' checked={completedLectures.includes(lecture?._id)} className='w-3 h-3' readOnly/>
                                                        <p className='text-sm font-semibold'>{lecture?.title}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default VideoDetailsSidebar