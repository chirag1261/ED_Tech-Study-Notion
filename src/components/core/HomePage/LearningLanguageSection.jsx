import React from 'react'
import HightlightText from './HightlightText'
import knowYourProgress from '../../../assets/Images/Know_your_progress.svg'
import compareWithOthers from '../../../assets/Images/Compare_with_others.svg'
import planYourLessons from '../../../assets/Images/Plan_your_lessons.svg'
import CTAButton from './Button'

function LearningLanguageSection() {
  return (
    <div className='md:mt-[130px] mt-[70px] md:mb-[90px] mb-[50px]'>
        <div className='flex flex-col gap-5 items-center'>
            <div className='sm:text-4xl text-2xl font-semibold sm:text-center'>
                Your swiss knife for <HightlightText text={"learning new language"}/>
            </div>
            <p className='sm:text-center text-richblack-600 mx-auto text-base font-medium sm:w-[70%]'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>

            <div className='flex flex-wrap items-center justify-center mt-5'>
                <img src={knowYourProgress} alt='' className='lg:-mr-32 '/>
                
                <img src={compareWithOthers} alt='' className='-mt-10 lg:mt-0'/>

                <img src={planYourLessons} alt='' className='lg:-ml-36 -mt-14 lg:mt-0'/>
            </div>

            <div className='w-fit sm:mt-10'>
                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>
            </div>
        </div>
    </div>
  )
}

export default LearningLanguageSection