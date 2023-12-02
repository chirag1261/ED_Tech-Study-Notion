import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from 'react-icons/hi2';
import RequirementField from './RequirementField';
import { setCourse, setStep } from '../../../../../slices/courseSlice';
import IconBtn from '../../../../common/IconBtn';
import { toast } from 'react-hot-toast';
import { COURSE_STATUS } from '../../../../../utils/constants';
import ChipInput from './ChipInput';
import Upload from './Upload';
import { VscChevronRight } from 'react-icons/vsc';

function CourseInformationForm() {
    const {register, handleSubmit, setValue, getValues, formState: {errors}} = useForm();
    const dispatch = useDispatch();
    const {course, editCourse} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);

    useEffect(() => {
        const getCategories = async() => {
            setLoading(true);
            const categories = await fetchCourseCategories();

            if(categories.length > 0) {
                setCourseCategories(categories);
            }

            setLoading(false);
        }

        if(editCourse) {
            setValue("courseTitle", course.courseName);
            setValue("courseShortDesc", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tags);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course?.category?._id);
            setValue("courseRequirements", course.instructions);
            setValue("courseImage", course.thumbnail);
        }

        getCategories();
    }, []);

    // console.log(course?.category);

    const isFormUpdated= () => {
        const currentValues = getValues();
        //Check if there is any changes in the form
        if( currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tags.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseImage.url !== course.thumbnail.url || 
            currentValues.courseRequirements.toString() !== course.instructions.toString() )
            return true;
        else 
            return false;
        
    }

    async function onSubmit(data) {
        if(editCourse) {
            if(isFormUpdated) {
                const currentValues = getValues();

                const formData = new FormData();

                formData.append("courseId", course._id);

                //Checking which values are changed?
                if(currentValues.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle);
                }

                if(currentValues.courseShortDesc !== course.courseDescription) {
                    formData.append("courseDescription", data.courseShortDesc);
                }

                if(currentValues.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice);
                }

                //Tags
                if(currentValues.courseTags.toString() !== course.tags.toString()) {
                    formData.append("tags", JSON.stringify(data.courseTags));
                }

                // and Images 
                if(!currentValues.courseImage?.url) {   //agar currentValue me url present nhi h iska matlab change hua h 
                    formData.append("thumbnail", data.courseImage)
                }

                if(currentValues.courseBenefits !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.courseBenefits);
                }

                if(currentValues.courseCategory._id !== course.category._id) {
                    formData.append("category", data.courseCategory);
                }

                if(currentValues.courseRequirements.toString() !== course.instructions.toString()) {
                    formData.append("instructions", JSON.stringify(data.courseRequirements));
                }

                setLoading(true);
                const result = await editCourseDetails(formData, token);

                if(result) {
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                }
                
                setLoading(false);
            }
            else {
                toast.error("No Changes made to the form");
            }
        }
        else {
            //create new course
            const formData = new FormData();
            formData.append("courseName", data.courseTitle);
            formData.append("courseDescription", data.courseShortDesc);
            formData.append("price", data.coursePrice);
            formData.append("category", data.courseCategory);
            formData.append("tags", JSON.stringify(data.courseTags));
            formData.append("thumbnail", data.courseImage);
            formData.append("whatYouWillLearn", data.courseBenefits);
            formData.append("instructions", JSON.stringify(data.courseRequirements));
            formData.append("status", COURSE_STATUS.DRAFT);

            const result = await addCourseDetails(formData, token);
            if(result) {
                dispatch(setStep(2));
                dispatch(setCourse(result));
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='rounded-md border-richblue-700 bg-richblack-800 p-6 space-y-8'>
        
            {/* Course Title */}
            <div>
                <label htmlFor='courseTitle' className='text-sm tracking-wide'>Course Title <sup className='text-pink-300 text-base'>*</sup></label>
                <input id='courseTitle' placeholder='Enter Course Title' {...register("courseTitle", {required: true})} className='w-full bg-richblack-700 py-3 px-4 rounded-lg mt-2 border-b border-b-richblack-100 text-white' />
                {
                    errors.courseTitle && (
                        <span className='ml-2 text-xs tracking-wide text-pink-200'>Course Title is Required</span>
                    )
                }
            </div>
            
            {/* Course Short Description */}
            <div>
                <label htmlFor='courseShortDesc' className='text-sm tracking-wide'>Course Short Description <sup className='text-pink-300 text-base'>*</sup></label>
                <textarea id='courseShortDesc' placeholder='Enter Description' {...register("courseShortDesc", {required: true})} className='min-h-[140px] w-full bg-richblack-700 py-3 px-4 rounded-lg mt-2 border-b border-b-richblack-100 text-white'/>
                {
                    errors.courseShortDesc && (
                        <span className='ml-2 text-xs tracking-wide text-pink-200'>Course Description is Required</span>
                    )
                }
            </div>

            {/* Course Price */}
            <div className='relative'>
                <label htmlFor='coursePrice' className='text-sm tracking-wide'>Course Price <sup className='text-pink-300 text-base'>*</sup></label>
                <input type='number' id='coursePrice' placeholder='Enter Course Price' {...register("coursePrice", {required: true, valueAsNumber: true})} className='w-full bg-richblack-700 py-3 pl-10 px-4 rounded-lg mt-2 border-b border-b-richblack-100 text-white' />
                <HiOutlineCurrencyRupee className='absolute top-11 text-2xl text-richblack-400 left-2'/>
                {
                    errors.coursePrice && (
                        <span className='ml-2 text-xs tracking-wide text-pink-200'>Course Price is Required</span>
                    )
                }
            </div>
                
            {/* Course Category */}
            <div>
                <label htmlFor='courseCategory' className='text-sm tracking-wide'>Course Category <sup className='text-pink-300 text-base'>*</sup></label>
                <select id='courseCategory' defaultValue={''} {...register("courseCategory", {required: true})} className='w-full bg-richblack-700 py-3 px-4 rounded-lg mt-2 border-b border-b-richblack-100 text-richblack-5 tracking-wide cursor-pointer'>
                    <option value="" disabled>Choose a Category</option>
                    {
                        !loading && courseCategories.map((category, index) => (
                            <option key={index} value={category?._id} className='cursor-pointer'>{category?.name}</option>
                        ))
                    }
                </select>
                {
                    errors.courseCategory && (
                        <span className='ml-2 text-xs tracking-wide text-pink-200'>Course Category is required</span>
                    )
                }
            </div>
            
            {/* Course Tags */}
            <ChipInput name= "courseTags" label="Tags" placeholder="Enter Tags and press Enter" register={register} errors={errors} setValue={setValue} getValues={getValues} />

            {/* Course Thumbnail Image */}
            <Upload name="courseImage" label={"Course Thumbnail"} register={register} errors={errors} setValue={setValue} editData={editCourse ? course?.thumbnail?.url : null}/>

            {/* Benefits */}
            <div>
                <label htmlFor='courseBenefits' className='text-sm tracking-wide'>Benefits of the course <sup className='text-pink-300 text-base'>*</sup></label>
                <textarea id='courseBenefits' placeholder='Enter Benefits of the Course' {...register("courseBenefits", {required: true})} className='min-h-[140px] w-full bg-richblack-700 py-3 px-4 rounded-lg mt-2 border-b border-b-richblack-100 text-richblack-5'/>
                {
                    errors.courseBenefits && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">Course Benefits are Required</span>
                    )
                }
            </div>

            <RequirementField name="courseRequirements" label="Requiremens/Instructions" register={register} errors={errors} setValue={setValue} getValues={getValues}/>
            
            {/* Next Button */}
            <div className='flex justify-end'>
                {
                    editCourse && (
                        <button onClick={() => dispatch(setStep(2))} className='flex items-center gap-2 bg-richblack-600 mr-3 rounded-md px-4 py-2'>
                            Continue Without Saving
                        </button>
                    )
                }

                <IconBtn disabled={loading} text={!editCourse ? "Next" : "Save Changes"}>
                    <VscChevronRight/>
                </IconBtn>
            </div>
        </form>
    )
}

export default CourseInformationForm