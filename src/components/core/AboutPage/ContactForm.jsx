import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm'

function ContactForm() {
  return (
    <div className='text-white flex flex-col items-center justify-center'>
        <p className='text-4xl font-semibold'>Get in Touch</p>
        <p className='text-richblack-300 mt-3 text-center px-5'>We'd love to here for you, Please fill out this form.</p>

        <div className='mt-10'>
            <ContactUsForm/>
        </div>
    </div>
  )
}

export default ContactForm