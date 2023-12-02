import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import { MdAddCircleOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import { toast } from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import NestedView from './NestedView';
import { VscChevronRight } from 'react-icons/vsc'

function CourseBuilderForm() {
    const {register, handleSubmit, setValue, formState: {errors} } = useForm();
    const [editSectionName, setEditSectionName] = useState(null);
    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    function cancelEdit() {
        setEditSectionName(null);
        setValue("sectionName", '');
    }

    function goBack() {
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }

    function goToNext() {
        if(course?.courseContent.length === 0) {
            toast.error("Please Add atleast 1 section!");
            return;
        }

        if(course?.courseContent.some((section) => section?.subSection.length === 0)) {
            toast.error("Please Add atleast 1 Lecture in each section!");
            return;
        }

        dispatch(setStep(3));
    }

    async function onSubmit(data) {
        setLoading(true);
        let result;

        if(editSectionName) {
            result = await updateSection({
                sectionName: data.sectionName,
                sectionId: editSectionName,
                courseId: course._id,
            }, token);
        }
        else {
            result = await createSection({
                sectionName: data.sectionName,
                courseId: course._id,
            }, token);
        }

        if(result) {
            dispatch(setCourse(result));
            setEditSectionName(null);
            setValue("sectionName", '');
        }

        setLoading(false);
    }

    function handleChangeEditSectionName(sectionId, sectionName) {
        if(editSectionName === sectionId) {
            cancelEdit();
            return;
        }
        setEditSectionName(sectionId);
        setValue("sectionName", sectionName);
    }

    return (
        <div className='bg-richblack-800 rounded-md p-5 py-7'>
            <p className='text-3xl font-semibold'>Course Builder</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mt-7'>
                    <label htmlFor='sectionName' className='text-sm'>Section Name <sup className='text-pink-400 text-base'>*</sup></label>
                    <input id='sectionName' placeholder='Add Section Name' {...register('sectionName', {required: true})} className='w-full text-white bg-richblack-700 px-5 py-3 rounded-md mt-3'/>
                    {
                        errors.sectionName && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">Section Name is required</span>
                        )
                    }
                </div>

                <div className='mt-5 flex gap-3'>
                    <IconBtn type="submit" disabled={loading} text={editSectionName ? "Edit Section Name" : "Create Section"} outline={true}>
                        <MdAddCircleOutline size={20} className="text-yellow-50" />
                    </IconBtn>
                    {
                        editSectionName && (
                            <button type='button' onClick={cancelEdit} className='text-sm text-richblack-300 underline place-self-end'>Cancel Edit</button>
                        )
                    }
                </div>
            </form>

            {
                course?.courseContent?.length > 0 && (
                    <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
                )
            }

            <div className='flex gap-3 justify-end mt-10'>
                <button onClick={goBack} className='rounded-md px-5 py-2 flex items-center bg-richblack-700'>
                    Back
                </button>

                <IconBtn text={"Next"} onclick={goToNext}>
                    <VscChevronRight/>
                </IconBtn>
            </div>
        </div>
    )
}

export default CourseBuilderForm