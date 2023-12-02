import React from 'react'
import CTAButton from './Button'
import {FaArrowRight} from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'

function Codeblock({position, heading, subHeading, ctabtn1, ctabtn2, codeblock, bgGradient, codeColor}) {
    return (
        <div className={`flex ${position} flex-wrap md:my-20 justify-between sm:gap-10 relative`}>

            <div className='flex flex-col lg:w-[50%] sm:gap-8 gap-4'>
                {heading}

                <div className='text-richblack-300 font-bold'>
                    {subHeading}
                </div>

                <div className='flex gap-7 sm:mt-7'>
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className='flex gap-2 items-center'>
                            {ctabtn1.btnText}
                            <FaArrowRight/>
                        </div>
                    </CTAButton>

                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.btnText}
                    </CTAButton>
                </div>

            </div>

            {/* typeAnimation */}
            <div className='h-fit flex text-[10px] w-[100%] py-4 lg:w-[500px] bg-white bg-opacity-10 border border-richblack-300'>
                <div className='text-center flex flex-col w-[7%] text-richblack-400 font-inter font-bold text-base'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>

                <div className={`w-[90%] flex flex-col gap-2 text-base font-bold font-mono ${codeColor} pr-2`}>
                    <TypeAnimation
                        sequence={[codeblock, 2000, ""]}
                        repeat={Infinity}
                        cursor={true}
                        style={{whiteSpace: "pre-line", display: "block"}}
                        omitDeletionAnimation={true}
                    />
                </div>
            </div>

            <div className={`w-[372.95px] h-[257.05px] rounded-full opacity-20 absolute -top-5  bg-gradient-to-r from-pink-300 to-blue-400
                ${position === "flex-row" ? 'right-36' : '-left-5'}`}>
            </div>
        </div>
    )
}

export default Codeblock