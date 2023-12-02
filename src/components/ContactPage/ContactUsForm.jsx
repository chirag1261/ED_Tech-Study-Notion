import React from 'react'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CountryCode from '../../data/countrycode.json'
import { useDispatch } from 'react-redux';
import { contactUs } from '../../services/operations/reachAPI';

function ContactUsForm() {
    const {register, handleSubmit, reset, formState: {errors, isSubmitSuccessful}} = useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        if(isSubmitSuccessful) {
            reset({
                email: "",
                firstName: "",
                lastName: "",
                message: "",
                phoneNo: "",
            })
        }
    }, [reset, isSubmitSuccessful]);

    async function submitContactForm(data) {
        dispatch(contactUs(data));
    }

    return (
        <form onSubmit={handleSubmit(submitContactForm)} className='flex flex-col'>
            <div className='flex min-[490px]:flex-row flex-col gap-5 w-full  text-richblack-5'>

                {/* firstName */}
                <div className='flex flex-col min-[490px]:w-[50%] w-full'>
                    <label htmlFor='firstName'>First Name</label>
                    <input type='text' name='firstName' id='firstName' placeholder='Enter First Name'
                     {...register("firstName", {required: true})} className='w-full bg-richblack-700 py-3 px-4 rounded-lg mt-2 border-b border-b-gray-600 text-white'/>
                    {
                        errors.firstName && 
                        <span className='text-[#ff4848]'>Please enter first name</span>
                    }
                </div>

                {/* lastName */}
                <div className='flex flex-col min-[490px]:w-[50%] w-full'>
                    <label htmlFor='lastName'>Last Name</label>
                    <input type='text' name='lastName' id='lastName' placeholder='Enter Last Name'
                     {...register("lastName")} className='w-full bg-richblack-700 py-3 px-4 rounded-lg mt-2 border-b border-b-gray-600 text-white' />
                </div>
            </div>

            {/* Email */}
            <div className='flex flex-col my-5 w-full  text-richblack-5'>
                <label htmlFor='email'>Email Address</label>
                <input type='text' name='email' id='email' placeholder='Enter Email Address'
                    {...register("email", {required: true})} className='bg-richblack-700 py-3 px-4 rounded-lg mt-2 border-b border-b-gray-600 text-white'/>
                {
                    errors.email && 
                    <span  className='text-[#ff4848]'>Please Enter email address</span>
                }
            </div>

            {/* Phone Number */}
            <div className='flex flex-col text-richblack-5'>
                <label htmlFor='phonenumber'>Phone Number</label>

                <div className='flex min-[490px]:flex-row flex-col gap-5'>
                    <select name='dropdown' id='dropdown' {...register("countrycode", {required: true})} className='min-[490px]:w-[20%] w-full bg-richblack-700 py-3 px-4 rounded-lg mt-2 border-b border-b-gray-600 text-white'>
                        {
                            CountryCode.map((element, index) => (
                                <option key={index} value={element.code}>{element.code} - {element.country}</option>
                            ))
                        }
                    </select>
                    <input type='number' id='phonenumber' name='phonenumber' placeholder='01234 56789'
                        {...register("phoneNo", 
                            {   
                                required:  {value: true, message: "Please enter Phone number"}, 
                                maxLength: {value: 10, message: "invalid Phone Number"},
                                minLength: {value: 8, message: "invalid Phone Number"}
                            }
                        )} className='min-[490px]:w-[80%] w-full bg-richblack-700 py-3 px-4 rounded-lg mt-2 border-b border-b-gray-600 text-white'
                    />
                </div>
                {
                    errors.phoneNo && 
                    <span  className='text-[#ff4848]'>Invalid Phone Number</span>
                }
            </div>


            {/* Message */}
            <div className='flex flex-col my-5  text-richblack-5'>
                <label htmlFor='message'>Message</label>
                <textarea name='message' id='message' rows={'7'} cols={'10'} placeholder='Enter Your Message...' 
                    {...register("message", {required: true})} className='bg-richblack-700 py-3 px-4 rounded-lg mt-2 border-b border-b-gray-600 text-white'/>
                {
                    errors.message && 
                    <span  className='text-[#ff4848]'>Please Enter Message</span>
                }
            </div>
            
            <button type='submit' className='bg-yellow-50 px-10 py-3 rounded-xl text-black font-bold ease-in-out
            hover:scale-95 transition-all duration-200 sm:text-base text-[10px] border-b-[1px] border-r-[1px] border-white'>
                Send Message
            </button>
            
        </form>
    )
}

export default ContactUsForm