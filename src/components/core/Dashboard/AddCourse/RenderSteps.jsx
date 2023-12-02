import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import CourseInformationForm from './CourseInformation/CourseInformationForm';
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm'
import PublishCourseForm from './PublishCourse/PublishCourseForm';

function RenderSteps() {
    const {step} = useSelector((state) => state.course);

    const steps = [
        {
            id: 1,
            title: "Course Information"
        },
        {
            id: 2,
            title: "Course Builder"
        },
        {
            id: 3,
            title: "Publish"
        },
    ];

    return (
        <>
            <div className='flex justify-between px-10 mt-14 mb-3 relative sm:max-w-[500px] max-w-[300px] mx-auto'>
                {
                    steps.map((item, index) => (
                        <div key={index}>
                            <div>
                                <div className={`${step === item.id ? 'bg-yellow-900 border-yellow-50 text-yellow-50 px-3 py-1' 
                                : step > item.id ? 'text-richblack-800 bg-yellow-100 p-2'
                                :'bg-richblack-800 border-richblack-700 text-richblack-300 px-3 py-1'} border w-fit rounded-full`}
                                >
                                    {
                                        step > item.id ? (<FaCheck/>) : (item.id)
                                    }
                                </div>
                                    
                            </div>

                            {/* Add Dashes */}
                            {
                                step > item.id ? (<div className='border border-dashed sm:min-w-[155px] min-w-[55px] absolute top-4 ml-[2.2rem] border-yellow-50'></div>) :
                                item.id <= 2 ?
                                <div className='border border-dashed sm:min-w-[155px] min-w-[55px] absolute top-4 ml-[2.2rem] border-richblack-500'></div>: <div></div>
                            }
                        </div>
                    ))
                }
            </div>  

            <div className='flex sm:max-w-[500px] max-w-[300px] mx-auto justify-between text-sm mb-14 pr-10'>
                {
                    steps.map((item, index) => (
                        <div key={index}><p className={`${step === item.id ? 'text-richblack-5' : 'text-richblack-500 tracking-wider'} text-center tracking-wide`}>{item.title}</p></div>
                    ))
                }
            </div> 

            {step === 1 && <CourseInformationForm/>}
            {step === 2 && <CourseBuilderForm/>}
            {step === 3 && <PublishCourseForm/>}
        </>
    )
}

export default RenderSteps