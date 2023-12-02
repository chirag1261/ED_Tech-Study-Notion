import React from 'react'
import Footer from '../components/common/Footer'
import { HiChatBubbleLeftRight } from 'react-icons/hi2'
import { BiWorld } from 'react-icons/bi'
import { IoCall } from 'react-icons/io5'
import ContactUsForm from '../components/ContactPage/ContactUsForm'
import ReviewSlider from '../components/common/ReviewSlider'

const contactData = [
    {
        img: <HiChatBubbleLeftRight fontSize={'1.5rem'}/>,
        heading: "Chat with us",
        description1: "Our friendly team is here to help.",
        description2: "info@studynotion.com",
    },
    {
        img: <BiWorld fontSize={'1.5rem'}/>,
        heading: "Visit us",
        description1: "Come and say hello at our office HQ.",
        description2: "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
    },
    {
        img: <IoCall fontSize={'1.5rem'}/>,
        heading: "Call us",
        description1: "Mon - Fri From 8am to 5pm",
        description2: "+123 456 7869",
    }
];

function Contact() {
  return (
    <div>
        {/* Form */}
        <div className='flex lg:flex-row flex-col gap-10 max-w-maxContent mx-auto md:px-12 sm:px-10 px-3 py-20'>
            <div className='lg:w-[40%] w-full rounded-xl place-self-start bg-richblack-800'>
                {
                    contactData.map((data, index) => (
                        <div key={index} className='text-richblack-300 font-semibold md:px-9 px-5 py-7 flex flex-col'>
                            <div className='flex gap-3 sm:text-xl items-center'>
                                <div className='text-richblack-300'>{data.img}</div>
                                <p className='text-richblack-5'>{data.heading}</p>
                            </div>
                            <p className='sm:text-base text-sm'>{data.description1}</p>
                            <p className='sm:text-base text-sm'>{data.description2}</p>
                        </div>
                    )) 
                }
            </div>

            <div className='lg:w-[60%] rounded-xl border border-white border-opacity-30 lg:p-12 sm:p-7 py-5 px-3'>
                <p className='text-richblack-5 sm:text-4xl text-3xl font-semibold'>Got a Idea? We've got the skills. Let's team up</p>
                <p className='text-richblack-300 mt-2'>Tell us more about yourself and what you're got in mind.</p>

                <div className='lg:mt-10 sm:mt-5'>
                    <ContactUsForm/>
                </div>
            </div>
        </div>

        <div className='flex flex-col mx-auto w-11/12 max-w-maxContent items-center justify-center text-richblack-5 mb-10'>
            <div className='w-full'>
                <ReviewSlider />
            </div>
        </div>

        <Footer/>
    </div>
  )
}

export default Contact