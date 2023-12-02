import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import HightlightText from './HightlightText'
import CTAButton from './Button'
import { FaArrowRight } from 'react-icons/fa'

function InstructorSection() {
    return (
        <div className='md:my-16 my-10'>
            <div className='flex md:flex-row flex-col lg:gap-20 gap-10 items-center'>
                <div className='lg:w-[50%]'>
                    <img src={Instructor} alt='' className='shadow-white shadow-md rounded-md'/>
                </div>

                <div className='lg:w-[50%] flex flex-col gap-5'>
                    <p className='sm:text-4xl text-3xl font-semibold lg:w-[50%]'>Become an <HightlightText text={"Instructor"}/></p>
                    <p className='lg:w-[80%] font-medium text-base text-richblack-300'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>

                    <div className='w-fit'>
                        <CTAButton active={true} linkto={'/sign'}>
                            <div className='flex gap-5 items-center'>
                                Start Teaching Today
                                <FaArrowRight/>
                            </div>
                        </CTAButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InstructorSection