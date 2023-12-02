import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../services/operations/authAPI';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import Loader from '../components/common/Loader';
import { BiArrowBack } from 'react-icons/bi';

function UpdatePassword() {
    const dispatch = useDispatch();
    const {loading} = useSelector((state) => state.auth);
    const location = useLocation();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);    
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        confirmPassword: "", password: ""
    });

    function handleOnChange(e) {
        setFormData((prev) => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(formData.password, formData.confirmPassword, token, navigate))
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
                    <p className='text-richblack-5 sm:text-3xl text-2xl place-self-start font-semibold'>Choose New Password</p>
                    <p className='text-richblack-100 sm:w-[90%] place-self-start'>Almost done. Enter your new password and youre all set.</p>
                    <form  onSubmit={handleOnSubmit} className='flex flex-col gap-5'>

                        <label className='relative'>
                            <p className='text-richblack-25'>New Password <sup className='text-[#f73f3f]'>*</sup></p>
                            <input required type={`${showPassword ? "text" : "password"}`} name='password' value={formData.password}
                             onChange={handleOnChange} placeholder='New Password' className='w-full bg-[#161d29] py-3 px-4 rounded-lg mt-2 border-b border-b-gray-600 text-white'/>
                            <span onClick={() => setShowPassword(!showPassword)} className='absolute lg:right-6 right-2 top-[55%] text-2xl text-white text-opacity-75'>
                                {
                                    showPassword ? <AiFillEyeInvisible/> : <AiFillEye/>
                                }
                            </span>
                        </label>

                        <label className='relative'>
                            <p>Confirm Password</p>
                            <input required type={`${showConfirmPassword ? "text" : "password"}`} name='confirmPassword' value={formData.confirmPassword}
                             onChange={handleOnChange} placeholder='Confirm Password' className='w-full bg-[#161d29] py-3 px-4 rounded-lg mt-2 border-b border-b-gray-600 text-white '/>
                            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='absolute lg:right-6 right-2 top-[55%] text-2xl text-white text-opacity-75'>
                                {
                                    showConfirmPassword ? <AiFillEyeInvisible/> : <AiFillEye/>
                                }
                            </span>
                        </label>

                        <button type='submit' className='bg-yellow-50 w-full mt-3 py-3 text-black rounded-lg font-semibold
                            hover:scale-95 transition-all duration-300 hover:bg-yellow-100'>
                            Reset Password
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

export default UpdatePassword