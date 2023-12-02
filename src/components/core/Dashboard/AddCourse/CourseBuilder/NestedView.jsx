import React from 'react'
import { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { RxDropdownMenu } from 'react-icons/rx';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BiDownArrow } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import SubSectionModal from './SubSectionModal';
import ConfirmationModal from '../../../../common/ConfirmationModal'
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';

function NestedView({handleChangeEditSectionName}) {
    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);

    const [confirmationModal, setConfirmationModal] = useState(null);

    async function handleDeleteSection(sectionId) {
        const result = await deleteSection({
            sectionId,
            courseId: course?._id
        }, token);

        if(result) {
            dispatch(setCourse(result));
        }

        setConfirmationModal(null);
    }

    async function handleDeleteSubSection(subSectionId, sectionId, courseId) {
        const result = await deleteSubSection({
            subSectionId,
            sectionId,
            courseId
        }, token);

        if(result) {
            //Extra something there!!!!
            dispatch(setCourse(result));
        }

        setConfirmationModal(null);
    }
    
    return (
        <div>
            <div className='mt-10 rounded-md bg-richblack-700 p-6 px-8'>
                {course?.courseContent?.map((section) => (
                    <details key={section._id} open>
                        <summary className='flex justify-between items-center py-2 border-b-[1px] border-richblack-500'>
                            <div className='flex items-center gap-4'>
                                <RxDropdownMenu className='text-xl text-richblack-300'/>
                                <p className='text-richblack-25'>{section?.sectionName}</p>
                            </div>

                            <div className='flex items-center text-richblack-300 '>
                                <button onClick={() => handleChangeEditSectionName(section?._id, section?.sectionName)}>
                                    <MdEdit className='text-xl mr-1'/>
                                </button>

                                <button onClick={() => setConfirmationModal({
                                    text1: "Delete this section?",
                                    text2: "All the lectures in this section will be deleted",
                                    btn1Text: "Delete",
                                    btn2Text: "Cancel",
                                    btn1Handler: () => handleDeleteSection(section?._id),
                                    btn2Handler: () => setConfirmationModal(null)
                                })}>
                                    <RiDeleteBin6Line className='text-xl'/>
                                </button>

                                <span className='mx-3 text-xl'>|</span>
                                <BiDownArrow className='text-lg'/>
                            </div>
                        </summary>

                        <div>
                            {
                                section?.subSection?.map((data) => (
                                    <div key={data?._id} >
                                        <div className='flex items-center justify-between py-2 mx-5 text-xl border-b-[1px] border-richblack-500 cursor-pointer' onClick={() => setViewSubSection(data)}>
                                            <div className='flex items-center gap-4'>
                                                <RxDropdownMenu className='text-richblack-300'/>
                                                <p className='text-base'>{data?.title}</p>
                                            </div>

                                            <div className='flex items-center text-xl text-richblack-300' onClick={(e) => e.stopPropagation()}>
                                                <button onClick={() => setEditSubSection(data)}>
                                                    <MdEdit/>
                                                </button>

                                                <button onClick={() => setConfirmationModal({
                                                    text1: "Delete this sub section?",
                                                    text2: "Selected lecture will be deleted",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: () => handleDeleteSubSection(data?._id, section?._id, course?._id),
                                                    btn2Handler: () => setConfirmationModal(null)
                                                })}>
                                                    <RiDeleteBin6Line className='ml-1'/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                            <button onClick={() => setAddSubSection(section?._id)} className='flex items-center gap-3 text-yellow-100 px-2 font-semibold text-sm py-2 rounded-md mt-2'>
                                <AiOutlinePlus className='font-extrabold text-lg'/>
                                <p>Add Lecture</p>
                            </button>
                        </div>

                    </details>
                ))}
            </div>

            {
                addSubSection ? (<div className='inset-0 fixed flex items-center justify-center z-[25]'><SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true} courseId={course?._id}/></div>) 
                : viewSubSection ? (<div className='inset-0 fixed flex items-center justify-center z-[25]'><SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true} courseId={course?._id}/></div>) 
                : editSubSection ? (<div className='inset-0 fixed flex items-center justify-center z-[25]'><SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true} courseId={course?._id}/></div>) 
                : (<div></div>)
            }

            {/* For Deletion */}
            {
                confirmationModal ? (<div className='inset-0 fixed flex items-center justify-center z-[15]'><ConfirmationModal modalData={confirmationModal}/></div>) :
                <div></div>
            }

            {   confirmationModal ? <div className='backdrop-blur-md inset-0 fixed z-[10]'></div> : 
                addSubSection ? <div className='backdrop-blur-md inset-0 fixed z-[10]'></div> : 
                viewSubSection ? <div className='bg-black bg-opacity-40 backdrop-blur-sm inset-0 fixed z-[10]'></div> : 
                editSubSection ? <div className='backdrop-blur-md inset-0 fixed z-[10]'></div> : <div></div>
            }
        </div>
    )
}

export default NestedView