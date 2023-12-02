import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import { RxCross1 } from 'react-icons/rx';
import Upload from '../CourseInformation/Upload';
import IconBtn from '../../../../common/IconBtn';

function SubSectionModal({modalData, setModalData, add=false, view=false, edit=false, courseId}) {
    const {register, handleSubmit, setValue, getValues, formState: {errors}} = useForm();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const {token} = useSelector((state) => state.auth);
    const {course} = useSelector((state) => state.course);

    useEffect(() => {
        if(view || edit) {
            setValue("lectureTitle", modalData.title);
            setValue("lectureDesc", modalData.description);
            setValue("lectureVideo", modalData.video);
        }
    }, []);

    function isFormUpdated() {
        const currentValues = getValues();
        if( currentValues.lectureTitle !== modalData.title || 
            currentValues.lectureDesc !== modalData.description || 
            currentValues.lectureVideo !== modalData.video ) {
                return true;
        }
        else {
            return false;
        }
    }

    async function handleEditSubSection() {
        const currentValues = getValues();
        const formData = new FormData();
        
        formData.append("courseId", courseId);
        formData.append("subSectionId", modalData._id);

        
        if( currentValues.lectureTitle !== modalData.title) {
            formData.append("title", currentValues.lectureTitle);
        }
        
        if( currentValues.lectureDesc !== modalData.description) {
            formData.append("description", currentValues.lectureDesc);
        }

        if( currentValues.lectureVideo !== modalData.video.url) {
            formData.append("video", currentValues.lectureVideo);
        }

        setLoading(true);
        const result = await updateSubSection(formData, token);

        if(result) {
            //TODO Check for Updation
            dispatch(setCourse(result));
        }

        setModalData(null);
        setLoading(false);
    }

    async function onSubmit(data) {
        if(view) {
            return;
        }

        if(edit) {
            if(!isFormUpdated()) {
                toast.error("No changes made to the form")
            }
            else {
                handleEditSubSection();
            }
            return;
        }

        //ADD
        const formData = new FormData();
        formData.append("sectionId", modalData);
        formData.append("title", data.lectureTitle);
        formData.append("description", data.lectureDesc);
        formData.append("video", data.lectureVideo);
        formData.append("courseId", courseId);

        setLoading(true);
        const result = await createSubSection(formData, token);

        if(result) {
            //TODO Check for Updation
            dispatch(setCourse(result));
        }

        setModalData(null);
        setLoading(false);
    }

    return (
        <div className='overflow-auto'>
            <div className='max-w-[500px] sm:min-w-[500px] mx-1 bg-richblack-800 rounded-md border border-richblack-600 overflow-x-auto'>
            <div className='flex justify-between items-center bg-richblack-700 px-6 py-2 rounded-t-md'>
                <p>{view && "Viewing"} {edit && "Editing"} {add && "Adding"} Lecture</p>
                <button>
                    <RxCross1 onClick={() => (!loading ? setModalData(null) : {})}/>
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='px-6 py-5'>
                <Upload
                    name={"lectureVideo"}
                    label={"Lecture Video"}
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    video={true}
                    viewData = {view ? modalData.video.url : null}
                    editData = {edit ? modalData.video.url : null}
                />
                <div className='mt-4'>
                    <label>Lecture Title</label>
                    <input id='lectureTitle' placeholder='Enter Lecture title' {...register("lectureTitle", {required: true})} className='w-full text-richblack-5 mt-2 bg-richblack-700 px-5 py-3 rounded-md border-b border-richblack-100'/>
                    {
                        errors.lectureTitle && (
                            <span>Lecture Title is required</span>
                        )
                    }
                </div>
                <div className='mt-4'>
                    <label>Lecture Description</label>
                    <textarea id='lectureDesc' placeholder='Enter lecture Description' {...register("lectureDesc", {required: true})} className='min-h-[140px] w-full bg-richblack-700 py-3 px-4 rounded-lg mt-2 border-b border-b-richblack-100 text-richblack-5'/>
                    {
                        errors.lectureDesc && (
                            <span>Lecture Description is required</span>
                        )
                    }
                </div>

                {
                    !view && (
                        <div className='mt-5 flex justify-end'>
                            <IconBtn text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}/>
                        </div>
                    )
                }
            </form>
            </div>
        </div>
    )
}

export default SubSectionModal