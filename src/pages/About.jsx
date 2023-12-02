import React from 'react'
import HightlightText from '../components/core/HomePage/HightlightText'
import BannerImage1 from '../assets/Images/aboutus1.webp'
import BannerImage2 from '../assets/Images/aboutus2.webp'
import BannerImage3 from '../assets/Images/aboutus3.webp'
import Quote from '../components/core/AboutPage/Quote'
import FoundingStoryImage from '../assets/Images/FoundingStory.png';
import StatsComponent from '../components/core/AboutPage/StatsComponent'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactForm from '../components/core/AboutPage/ContactForm'
import Footer from '../components/common/Footer'
import ReviewSlider from '../components/common/ReviewSlider'

function About() {
    return (
        <div>
            {/* Section 1 */}
            <section className='bg-richblack-700 relative'>
                <div className='mx-auto lg:w-[1200px] pb-5 sm:pb-0 sm:shadow-none shadow-lg shadow-pink-500'>
                    <div className='flex flex-col items-center justify-center'>
                        <div className='md:text-4xl text-3xl text-richblack-5 font-semibold mt-24 lg:w-[60%] text-center px-5 md:px-0'>Driving Innovation in Online Education for a <HightlightText text={"Brighter Future"}/></div>
                        <p className='text-richblack-200 md:text-[17px] text-center lg:w-[50%] mt-5 md:mb-[14rem] sm:mb-[7rem] px-5 lg:px-0'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                    </div>

                    <div className='sm:absolute flex sm:flex-row flex-col md:gap-10 gap-5 my-14 lg:top-[50%] md:top-[60%] sm:top-[70%] sm:-translate-x-[5%] 
                    items-center sm:px-20 px-5'>
                        <img src={BannerImage1} alt='' className='sm:w-1/3 min-[1200px]:w-auto rounded-xl sm:rounded-none'/>
                        <img src={BannerImage2} alt='' className='sm:w-1/3 min-[1200px]:w-auto hidden sm:block'/>
                        <img src={BannerImage3} alt='' className='sm:w-1/3 min-[1200px]:w-auto hidden sm:block'/>
                    </div>
                </div>
            </section>

            {/* Section 2 */}
            <section className='sm:mt-[12rem] my-16 sm:mb-[5rem] lg:w-[1200px] mx-auto'>
                <Quote/>
            </section>

            <hr className='text-richblack-700'/>

            {/* Section 3 */}
            <section className='mx-auto w-11/12 max-w-maxContent'>
                <div className='flex lg:flex-row flex-col gap-10 justify-between lg:mt-[7rem] lg:mb-[10rem] my-10 items-center'>
                    <div className='text-richblack-200 lg:w-[50%] text-justify'>
                        <p className='text-4xl font-semibold'><HightlightText text={"Our Founding Story"}/></p>
                        <p className='mt-10 font-medium text-[17px]'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                        <p className='mt-10 font-medium text-[17px]'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                    </div>

                    <div>
                        <img alt='' src={FoundingStoryImage} className='shadow-pink-500 shadow-xl'/>
                    </div>
                </div>

                <div className='text-richblack-300 my-10 flex lg:flex-row flex-col justify-between text-justify gap-10'>
                    {/* Vision */}
                    <div className='lg:w-[40%]'>
                        <p className='text-4xl font-semibold'><HightlightText text={"Our Vision"}/></p>
                        <p className='text-[17px] md:mt-10 mt-5'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                    </div>

                    {/* Mission */}
                    <div className='lg:w-[40%]'>
                        <p className='text-4xl font-semibold'><HightlightText text={"Our Mission"}/></p>
                        <p className='text-[17px] md:mt-10 mt-5'>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                    </div>
                </div>
            </section>

            {/* Section 4 */}
            <section  className='bg-richblack-700 py-10 my-[5rem]'>
                <StatsComponent/>
            </section>

            {/* Section 5 */}
            <section className='mx-auto w-11/12 max-w-maxContent'>
                <LearningGrid/>
            </section>

            {/* Section 6 -> FORM */}
            <section className='my-20 sm:px-0 px-3'>
                <div className='sm:w-[500px] mx-auto flex items-center justify-center'>
                    <ContactForm/>
                </div>
            </section>

            {/* Section 7 */}
            <section className='flex flex-col mx-auto w-11/12 max-w-maxContent items-center justify-center text-richblack-5 mb-10'>
                <div className='w-full'>
                    <ReviewSlider />
                </div>
            </section>

            <Footer/>
        </div>
    )
}

export default About