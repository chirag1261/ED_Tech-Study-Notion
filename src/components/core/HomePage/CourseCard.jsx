import React from 'react'
import BeginnerLogo1 from '../../../assets/Images/BeginnerLogo1.svg'
import BeginnerLogo2 from '../../../assets/Images/BeginnerLogo2.svg'
import LessonLogo1 from '../../../assets/Images/LessonLogo1.svg'
import LessonLogo2 from '../../../assets/Images/LessonLogo2.svg'

function CourseCard({cardData, currentCard, setCurrentCard}) {
    const isSelected = currentCard === cardData.heading;

    const handleClick = () => {
        setCurrentCard(cardData.heading);
        // You can update other properties here based on your requirement
    };

    return (
        <div className='bg-yellow-50'>
            <div className={`flex flex-col py-4 px-5 ${isSelected ? "bg-white -translate-x-3 -translate-y-3" : "bg-richblack-800"} cursor-pointer`} 
                onClick={handleClick}>
                <p className={`${isSelected ? "text-black" : "text-richblack-25"} font-semibold`}>{cardData.heading}</p>
                
                <p className='text-base text-richblack-400 mt-4 mb-16'>{cardData.description}</p>
                
                <hr className={`${isSelected ? 'text-blue-300' : "text-richblack-400"} border-dashed `}/>

                <div className={`flex justify-between ${isSelected ? 'text-blue-300' : "text-richblack-400"} text-sm mt-3`}>
                    <div className='flex gap-3 items-center'>
                        <img src={isSelected ? BeginnerLogo1 : BeginnerLogo2} alt=''/>
                        {cardData.level}
                    </div>
                    <div className='flex gap-3 items-center'>
                        <img src={isSelected ? LessonLogo1 : LessonLogo2} alt=''/>
                        {`${cardData.lessionNumber} Lessons`}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CourseCard