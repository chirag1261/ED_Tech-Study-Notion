import React, { useState } from 'react'
import Loader from '../../../common/Loader';
import { HiPencil } from 'react-icons/hi2';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiFillCheckCircle, AiFillClockCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { COURSE_STATUS } from '../../../../utils/constants'
import ConfirmationModal from '../../../common/ConfirmationModal'
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../../../services/formatDate'
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';
import { duration } from '../../../../utils/courseDuration';

function CourseTable({courses, setCourses}) {
    const {token} = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const navigate = useNavigate();

    async function handleCourseDelete(id) {
        setLoading(true);

        await deleteCourse({courseId: id}, token);
        const response = await fetchInstructorCourses(token);
        
        if(response) {
            setCourses(response);
        }

        setConfirmationModal(null);
        setLoading(false);
    }
    
    function subSectionDurationHandle(course) {
        let totalDuration = 0;
    
        for (const section of course?.courseContent) {
    
            for (const subSection of section?.subSection || []) {
                totalDuration += parseFloat(subSection?.timeDuration) || 0;
            }
        }
        
        return duration(totalDuration);
    }

    return (
        <div className='mt-10'>
            <Table className="rounded-xl border border-richblack-800 ">
                <Thead>
                    <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
                        <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">Courses</Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">Duration</Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">Price</Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                {
                    loading ? 
                    <Tr>
                        <Td className="py-10 text-center font-medium text-richblack-100">
                            <Loader/>
                        </Td>
                    </Tr> :
                    courses?.length === 0 ?
                    <Tr>
                        <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                            No courses found
                        </Td>
                    </Tr> : 
                    courses?.map((course) => (
                        <Tr key={course._id} className="flex gap-x-10 border-b border-richblack-800 px-6 py-8">
                            <Td className="flex flex-1 gap-x-4">
                                <img src={course?.thumbnail?.url} alt={course?.courseName} className="h-[148px] w-[220px] rounded-lg object-cover" />
                                <div className="flex flex-col justify-between">
                                    <p className="text-lg font-semibold text-richblack-5"> {course.courseName} </p>
                                    
                                    <p className="text-xs text-richblack-300"> {
                                        course.courseDescription.split(" ").length > 30 ? course.courseDescription.split(" ").slice(0, 30).join(" ") + "..." : course.courseDescription
                                       }
                                    </p>
                                    
                                    <p className="text-[12px] text-white">Created: {formatDate(course.createdAt)}</p>
                                    {
                                        course.status === COURSE_STATUS.DRAFT ?
                                        <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                                            <AiFillClockCircle size={14} />
                                            Drafted
                                        </p> : 
                                        <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                                            <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                                            <AiFillCheckCircle size={8} />
                                            </div>
                                            Published
                                        </p>
                                    }
                                </div>
                            </Td>

                            <Td className="text-sm font-medium text-richblack-100">{subSectionDurationHandle(course)}</Td>

                            <Td className="text-sm font-medium text-richblack-100">₹{course.price}</Td>

                            <Td className="text-sm font-medium text-richblack-100 ">
                                <button disabled={loading} onClick={() => { navigate(`/dashboard/edit-course/${course._id}`) }}
                                    title="Edit"
                                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300">
                                    <HiPencil size={20} />
                                </button>
                                <button disabled={loading} onClick={() => {
                                    setConfirmationModal({
                                        text1: "Do you want to delete this course?",
                                        text2: "All the data related to this course will be deleted",
                                        btn1Text: !loading ? "Delete" : "Loading...  ",
                                        btn2Text: "Cancel",
                                        btn1Handler: !loading ? () => handleCourseDelete(course._id) : () => {},
                                        btn2Handler: !loading ? () => setConfirmationModal(null) : () => {},
                                    })
                                }} title="Delete" className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]">
                                    <RiDeleteBin6Line size={20} />
                                </button>
                            </Td>
                        </Tr>
                    ))
                }
                </Tbody>
            </Table>

            {
                confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
            }
        </div>
    )
}

export default CourseTable