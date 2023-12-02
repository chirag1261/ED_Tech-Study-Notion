import React from 'react'
import HightlightText from '../HomePage/HightlightText';
import CTAButton from '../HomePage/Button'

const LearningGridArray = [
    {
        order: -1,
        heading: "World-Class Learning for",
        highlightText: "Anyone, Anywhere",
        description: "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        btnText: "Learn More",
        btnLink: "/",
    },
    {
        order: 1,
        heading: "Curriculum Based on Industry Needs",
        description: "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
        order: 2,
        heading: "Our Learning Methods",
        description: "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 3,
        heading: "Certification",
        description: "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 4,
        heading: `Rating "Auto-grading"`,
        description: "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 5,
        heading: `Ready to Work"`,
        description: "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
];

function LearningGrid() {
  return (
    <div className='grid mx-auto lg:grid-cols-4 grid-cols-1 lg:w-auto sm:w-[500px] mb-10 text-richblack-5 mt-10'>
        {
            LearningGridArray.map((card, index) => (
                <div key={index} 
                    className={`${index === 0 && 'lg:col-span-2'} 
                    ${card.order % 2 === 1 ? 'bg-richblack-700' : "bg-richblack-800"} lg:h-[300px]
                    ${card.order === 3 && "lg:col-start-2"}
                    ${card.order === -1 && "bg-transparent"}`}
                >
                    {
                        card.order === -1 ?
                        (<div className='lg:w-[90%] flex flex-col lg:p-3 pb-3 gap-4'>
                            <div className='sm:text-4xl text-2xl font-semibold'>
                                {card.heading}
                                <HightlightText text={card.highlightText}/>
                            </div>
                            <p className='text-richblack-300 sm:text-[17px]'>{card.description}</p>
                            <div className='w-fit'>
                                <CTAButton active={true} linkto={card.btnLink}>{card.btnText}</CTAButton>
                            </div>
                        </div>) :
                        (<div className='p-8 flex flex-col gap-5'>
                            <p className='text-xl'>{card.heading}</p>
                            <p  className='text-richblack-100 mt-5'>{card.description}</p>
                        </div>)
                    }
                </div>
            ))
        }
    </div>
  )
}

export default LearningGrid