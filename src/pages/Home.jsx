import React from 'react'
import { Link } from 'react-router-dom'
import {FaArrowRight} from 'react-icons/fa'
import HightlightText from '../components/core/HomePage/HightlightText'

import CTAButton from '../components/core/HomePage/Button'
import Banner from '../assets/Images/banner.mp4'
import Codeblocks from '../components/core/HomePage/CodeBlocks'
import Footer from '../components/common/Footer'
import TimelineSection from '../components/core/HomePage/TimelineSection'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import ExploreMore from '../components/core/HomePage/ExploreMore.jsx'
import ReviewSlider from '../components/common/ReviewSlider'

function Home() {
    return (
        <div className=''>
            {/* Section 1*/}
            <div className='relative mx-auto flex flex-col w-11/12 items-center
             text-white justify-between max-w-maxContent'>

                {/* Become a Instructor */}
                <Link to={'/signup'}>
                    <div className='group mt-16 p-2 rounded-full bg-richblack-800 font-bold text-richblue-50 
                    transition-all duration-200 hover:scale-95 w-fit border-b-[1px]'>

                        <div className='flex gap-3 items-center rounded-full px-7 py-[5px] group-hover:bg-richblack-900'>
                            <p>Become an Instructor</p>
                            <FaArrowRight/>
                        </div>
                    </div>
                </Link>
                
                {/* Heading -> empower */}
                <div className='sm:text-center sm:text-4xl text-2xl mt-7 font-semibold text-richblack-5'>
                    Empower Your Future with
                    <HightlightText text={'Coding Skills'}/>
                </div>

                <div className='w-[100%] md:w-[80%] sm:text-center font-medium text-richblack-300 mt-4 text-lg tracking-[0.5px]'>
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
                </div>

                {/* Buttons */}
                <div className='flex gap-7 mt-8'>
                    <CTAButton active={true} linkto={'/signup'}>Learn More</CTAButton>
                    <CTAButton linkto={'/login'}>Book a Demo</CTAButton>
                </div>

                <div className='shadow-blue-200 md:my-20 my-10 bg-white relative'>
                    <video muted loop autoPlay className='md:-translate-y-6 md:-translate-x-6 -translate-y-2 -translate-x-2
                         shadow-[-5px_-5px_50px_rgba(8,_112,_184,_0.7)] '>
                        <source src={Banner} type='video/mp4'></source>
                    </video>
                </div>

                {/* Code Section 1 */}
                <div>
                    <Codeblocks
                        position={'flex-row'}
                        heading={
                            <div className='font-semibold sm:text-4xl text-2xl'>
                                Unlock Your
                                <HightlightText text={"coding potential "}/>
                                with our online course
                             </div>
                        }
                        subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                        ctabtn1={{btnText: "Try it Yourself", linkto: "/signup", active: true}}
                        ctabtn2={{btnText: "Learn More", linkto: "/login", active: false}}
                        codeblock={`<!DOCTYPE html> \n <html> \n <head> \n <title>This is myPage</title> \n </head> \n <body> \n <h1><a href="/">Header</a></h1> \n <nav><a href="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a> \n </nav> \n </body>`}
                        codeColor={"text-yellow-25"}
                        // bgGradient={'text-yellow-25'}
                    />
                </div>

                {/* Code Section 2 */}
                <div className='my-10'>
                    <Codeblocks
                        position={'flex-row-reverse'}
                        heading={
                            <div className='font-semibold sm:text-4xl text-3xl'>
                                Start
                                <HightlightText text={"coding in seconds "}/>
                             </div>
                        }
                        subHeading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                        ctabtn1={{btnText: "Continue Lesson", linkto: "/signup", active: true}}
                        ctabtn2={{btnText: "Learn More", linkto: "/login", active: false}}
                        codeblock={`import React from 'react'; \n import CTAButton from './Button'; \n import TypeAnimation from 'react-type'; \n import {FaRight} from 'react-icons/fa'; \n\n const Home = () => { \n return ( \n <div>Home</div> \n ) \n } \n export default Home;`}
                        codeColor={"text-blue-25"}
                        // bgGradient={'text-blue-25'}
                    />
                </div>

                <ExploreMore/>
            </div>
            
            {/* Section 2*/}
            <div className='bg-pure-greys-5 text-richblack-700'>
                <div className='homepage_bg lg:h-[333px]'>
                    <div className='w-11/12 max-w-maxContent flex items-center justify-center gap-5 mx-auto'>
                        <div className='flex gap-7 text-white lg:mt-32 md:mt-10 mt-32'>
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className='flex items-center sm:gap-5 gap-3'>
                                    Explore Full Catalog
                                    <FaArrowRight/>
                                </div>
                            </CTAButton>

                            <CTAButton active={false} linkto={"/signup"}>
                                <div>
                                    Learn More
                                </div>
                            </CTAButton>
                        </div>
                    </div>
                </div>

                <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
                    <div className='flex flex-wrap lg:gap-[90px] gap-3 my-10'>
                        <div className='sm:text-4xl text-2xl font-semibold lg:w-[45%]'>
                            Get the skills you need for a <HightlightText text={"job that is in demand"}/>
                        </div>

                        <div className='flex flex-col items-start lg:w-[40%]'>
                            <div className='text-[16px] lg:mb-10 mb-5 mt-2'>
                                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <CTAButton active={true} linkto={"/signup"}><div>Learn More</div></CTAButton>
                        </div>
                    </div>

                    <TimelineSection/>

                    <LearningLanguageSection/>
                </div>
            </div>
            
            {/* Section 3*/}
            <div className='w-11/12 mx-auto max-w-maxContent flex-col justify-between items-center gap-8 bg-richblack-900 text-white mb-10'>
                <InstructorSection/>

                {/* ReviewSlider */}
                <ReviewSlider/>
            </div>

            {/* Footer*/}
            <Footer/>
        </div>
    )
}

export default Home