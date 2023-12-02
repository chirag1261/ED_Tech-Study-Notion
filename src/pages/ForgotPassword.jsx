import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';
import Loader from '../components/common/Loader'
import {BiArrowBack} from 'react-icons/bi'

function ForgotPassword() {
    const dispatch = useDispatch();
    const {loading} = useSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    function handleOnSubmit(e) {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));
    }

    return (
        <div className='text-white flex justify-center items-center min-h-[90vh]'>
            {
                loading ? 
                <div className='flex flex-col items-center gap-5'>
                    <Loader/>
                    <p className='text-pure-greys-100 sm:text-2xl text-xl'>Please Wait...</p>
                </div> :
                <div className='flex flex-col justify-center w-[500px] gap-5 rounded-xl sm:p-7 p-3 mx-2'>
                    <p className='text-richblack-5 sm:text-3xl text-2xl place-self-start font-semibold'>
                        {
                            !emailSent ?
                            "Reset your Password" : 
                            "Check Your Email"
                        }
                    </p>
                    <p className='text-richblack-100 sm:w-[90%] place-self-start'>
                        {
                            !emailSent ? 
                            "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" :
                            `We have sent the reset email to ${email}`
                        }
                    </p>

                    <form onSubmit={handleOnSubmit} className='place-self-start w-full'>
                        {
                            !emailSent && 
                            <label>
                                <p className='text-richblack-25'>Email Address <sup className='text-[#f73f3f]'>*</sup></p>
                                <input required type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} 
                                    placeholder='Enter Your Email Address' className='w-full bg-[#161d29] py-3 px-4 rounded-lg mt-2 border-b border-b-gray-600 text-white'/>
                            </label>
                        }
                        
                        <button type='submit' className='bg-yellow-50 w-full mt-7 py-3 text-black rounded-lg font-semibold
                            hover:scale-95 transition-all duration-300 hover:bg-yellow-100'>
                            {
                                !emailSent ? "Reset Password" : "Resend Email"
                            }
                        </button>
                    </form>

                    <Link to={"/login"} className='w-fit'>
                        <div className='place-self-start flex gap-2 items-center mt-5'>
                                <BiArrowBack/><p>Back to Login</p>
                        </div>
                    </Link>
                </div>
            }
        </div>
    )
}

export default ForgotPassword