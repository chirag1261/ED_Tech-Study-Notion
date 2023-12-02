import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timelineImage from '../../../assets/Images/TimelineImage.png'

const timeline = [
    {
        logo: Logo1, 
        heading: "Leadership",
        description: "Fully committed to the success company"
    },
    {
        logo: Logo2, 
        heading: "Responsibility",
        description: "Students will always be our top priority"
    },
    {
        logo: Logo3, 
        heading: "Flexibility",
        description: "The ability to switch is an important skills"
    },
    {
        logo: Logo4, 
        heading: "Solve the problem",
        description: "Code your way to a solution"
    },
]

function TimelineSection() {
  return (
    <div>
        <div className='flex md:flex-row flex-col gap-14 items-center'>
            <div className='lg:w-[40%] flex flex-col gap-5 justify-between'>
                {
                    timeline.map((ele, index) => (
                        <div className='flex gap-5' key={index}>
                            <div className='flex flex-col items-center'>
                                <div className='w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full'>
                                    <img src={ele.logo} alt=''/>
                                </div>

                                <div className={`w-[1px] min-h-[50px] border-dashed border border-richblack-300 my-3 ${ele.logo === Logo4 ? 'hidden' : 'visible'}`}></div>
                            </div>

                            <div>
                                <p className='font-semibold text-[18px]'>{ele.heading}</p>
                                <p className='text-base'>{ele.description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className='relative shadow-blue-200'>
                <img src={timelineImage} alt='' className='rounded-lg'/>

                <div className='absolute bg-caribbeangreen-700 flex text-white uppercase sm:py-10 py-5 sm:px-10 px-2 sm:flex-row flex-col
                    left-[50%] -translate-x-[50%] -translate-y-[50%]'>
                    <div className='flex gap-5 items-center sm:border-r border-b border-caribbeangreen-300 sm:px-7 px-3 pb-2 sm:mb-0'>
                        <p className='sm:text-3xl text-xl font-bold'>10</p>
                        <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
                    </div>
                    <div className='flex gap-5 items-center sm:px-7 px-3 mt-2 sm:mt-0'>
                        <p className='sm:text-3xl text-xl font-bold'>250</p>
                        <p className='text-caribbeangreen-300 text-sm'>Types of courses</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TimelineSection