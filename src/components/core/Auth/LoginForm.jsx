import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import CTAButton from '../HomePage/Button'
import { useDispatch } from 'react-redux';
import { login } from '../../../services/operations/authAPI'

function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email:"", password:""
    })

    const [showpass, setShowPass] = useState(false);

    function changeHandler(event) { 
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    async function submitHandler(event) {   
        event.preventDefault();
        dispatch(login(formData.email, formData.password, navigate));
    }

    return (
        <form className="flex flex-col gap-3">
            <label>
                <p className='text-white text-opacity-85 mt-3'>Email Address <sup className='text-[#f73f3f]'>*</sup></p>
                <input required type="email" value={formData.email} onChange={changeHandler} 
                 placeholder="Enter email address" name="email" 
                 className='lg:w-[115%] w-full bg-[#161d29] py-3 px-4 rounded-lg mt-2 border-b border-b-gray-600 text-white'/>
            </label>

            <label className='relative'>
                <p className='text-white text-opacity-85 mt-3'>Password <sup className='text-[#f73f3f]'>*</sup></p>
                <input required type={showpass ? ("text") : ("password")} value={formData.password} 
                 onChange={changeHandler} placeholder="Password" name="password"
                 className='lg:w-[115%] w-full bg-[#161d29] py-3 px-4 rounded-lg mt-2 border-b border-b-gray-600 text-white tracking-widest'/>

                <span onClick={() => setShowPass(!showpass)} className='absolute lg:-right-10 top-[60%] right-2  text-2xl text-white text-opacity-75'>
                    {showpass ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
                </span>

                <Link to="/forgot-password" className='absolute text-[#2281b5] text-sm lg:-right-[15%] right-0 top-28'><p>Forgot Password?</p></Link>
            </label>

            <div className='mt-14 lg:w-[115%]' onClick={submitHandler}>
                <CTAButton active={true}>Sign In</CTAButton>
            </div>
        </form>
    )
}

export default LoginForm