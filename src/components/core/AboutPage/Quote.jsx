import React from 'react'
import HightlightText from '../HomePage/HightlightText'

function Quote() {
  return (
    <div className='text-richblack-5 sm:text-4xl text-2xl font-semibold text-center sm:px-0 px-5'>
        We are passionate about revolutionizing the way we learn. Our innovative platform
        <HightlightText text={"combines technology"}/>{", "}
        <span className='text-brown-200'>expertise</span>{", "}
        and community to create an {" "}
        <span className='text-brown-400'>unparalleled educational experience.</span>
    </div>
  )
}

export default Quote