import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import HightlightText from './HightlightText';
import CourseCard from './CourseCard'

function ExploreMore() {
    const [currentTab, setCurrentTab] = useState(HomePageExplore[0].tag);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    function setMyCards(val) {
        setCurrentTab(val);
        const result = HomePageExplore.filter((course) => course.tag === val);

        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

    return (
        <div className='lg:max-w-[1000px] flex flex-col items-center'>
            <div className='font-semibold sm:text-4xl text-2xl sm:text-center'>
                Unlock the <HightlightText text={"Power of Code"}/>
            </div>
            <p className='text-richblack-300 text-lg mt-3 sm:text-center'>Learn to build anythin you can imagine</p>

            <div className='md:flex gap-1 rounded-full bg-richblack-800 items-center my-7 py-1 px-1 w-[710px] hidden'>
                {
                    HomePageExplore.map((course, index) => (
                        <div key={index} className={`text-base ${currentTab === course.tag ? 'bg-richblack-900 text-richblack-5 font-medium' : 'text-richblack-200'}
                        transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2 rounded-full`} onClick={() => setMyCards(course.tag)}>
                            {course.tag}
                        </div>
                    ))
                }
            </div>

            <div className='lg:h-[150px] md:mb-10 -mb-20 mt-5'>
                <div className='flex md:gap-10 gap-5 flex-wrap md:flex-nowrap justify-between w-full'>
                    {
                        courses.map((element, index) => (
                            <CourseCard 
                                key={index} 
                                cardData = {element}
                                currentCard = {currentCard} 
                                setCurrentCard = {setCurrentCard}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ExploreMore