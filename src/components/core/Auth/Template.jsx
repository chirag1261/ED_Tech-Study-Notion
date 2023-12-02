import React from 'react'
import frameImage from '../../../assets/Images/frame.png'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'

function Template({title, desc1, desc2, image, formtype}) {
    return (
        <div className={`bg-[#000814] flex lg:w-[1200px] lg:flex-row flex-col gap-10 lg:gap-0 mx-auto 
            justify-between ${formtype === "signup" ? "items-center" : ""} my-10 lg:p-5 sm:p-7 p-3 pt-14`}>

            <div className={`${formtype === "signup" ? "flex flex-col items-center lg:block" : ""}`}>
            
                <h1 className={`sm:w-[60%] md:text-3xl text-2xl font-bold text-white text-opacity-90 
                    ${formtype === "signup" ? "text-center lg:text-start" : ""}`}>{title}</h1>
                    
                <p className={`py-5 flex flex-col text-xl ${formtype === "signup" ? "lg:items-start justify-center" : ""}`}>
                    <span className='text-white text-opacity-60 text-center'>{desc1}</span>
                    <span className={`text-[#2281b5] italic text-center`}>{desc2}</span>
                </p>

                {formtype === "signup" ? 
                (<SignupForm />):
                (<LoginForm />)}
                
            </div>

            <div className='relative'>
                <img src={frameImage} alt="Pattern" loading="lazy"
                    className='lg:w-[558px] lg:h-[504px]'
                />
                <img src={image} alt="Students" loading="lazy"
                    className=' absolute sm:-top-4 sm:-left-4 -top-1 -left-1 lg:w-[558px] lg:h-[504px] rounded-md'
                />
            </div>
            
        </div>
    )
}

export default Template