import React, { useState } from 'react'
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { sendOtp, signUp } from '../services/operations/authAPI';
import { useEffect } from 'react';
import Loader from '../components/common/Loader';
import { BiArrowBack } from 'react-icons/bi';
import { TbRotateClockwise2 } from 'react-icons/tb';

function VerifyEmail() {
    const dispatch = useDispatch();
    const {loading, signupData} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');

    useEffect(() => {
        if(!signupData) {
            navigate("/signup")
        }
    }, [])

    function handleOnSubmit(e) {
        e.preventDefault();
        const {
            accountType, firstName, lastName, email, password, confirmPassword
        } = signupData;
    
        dispatch(signUp(accountType, firstName, lastName, email, password, 
            confirmPassword, otp, navigate));
    }
    return (
        <div className='text-white flex justify-center items-center min-h-[90vh]'>
            {
                loading ?
                <div className='flex flex-col items-center gap-5'>
                    <Loader/>
                    <p className='text-pure-greys-100 sm:text-2xl text-xl'>Please Wait...</p>
                </div> :
                <div className='flex flex-col justify-center w-[500px] gap-3 rounded-xl sm:p-7 p-3 mx-2'>
                    <h1 className='text-richblack-5 sm:text-3xl text-2xl place-self-start font-semibold'>Verify Email</h1>
                    <p className='text-richblack-100 sm:w-[90%] place-self-start'>A verification code has been sent to you. Enter the code below</p>
                    <form onSubmit={handleOnSubmit} className='flex items-center flex-col'>
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            inputStyle={{ width: '40px', marginRight: '10px' }} // Adjust the width of the input field
                            renderInput={(props, index) => (
                                <input
                                {...props}
                                className='bg-[#161d29] py-4 rounded-lg mt-2 border-b border-b-gray-600 text-white w-full text-center'
                                style={index !== 0 ? { marginLeft: '10px' } : null}
                                />
                            )}
                        />
                        <button type='submit' className='bg-yellow-50 w-full mt-7 py-3 text-black rounded-lg font-semibold
                            hover:scale-95 transition-all duration-300 hover:bg-yellow-100'>
                            Verify Email
                        </button>
                    </form>

                    <div className='flex justify-between items-center mt-5'>
                        <Link to={"/login"}>
                            <div className='flex gap-2 items-center'>
                                <BiArrowBack/><p>Back to Login</p>
                            </div>
                        </Link>

                        <div onClick={() => dispatch(sendOtp(signupData.email, navigate))} className='flex items-center gap-2 text-[#47A5C5] cursor-pointer'>
                            <TbRotateClockwise2 fontSize={'1.3rem'}/>
                            <p>Resend it</p>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default VerifyEmail