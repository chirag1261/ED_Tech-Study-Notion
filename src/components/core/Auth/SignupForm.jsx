import { useState } from 'react';
import { toast } from 'react-hot-toast';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CTAButton from '../HomePage/Button'

import { ACCOUNT_TYPE } from '../../../utils/constants'
import { setSignupData } from '../../../slices/authSlice';
import { sendOtp } from '../../../services/operations/authAPI';

function SignupForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
    })
    
    const [showCreatePass, setShowCreatePass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    function changeHandler(event) { 
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    function submitHandler(event) {
        event.preventDefault();

        if(formData.password !== formData.confirmPassword) {
            toast.error("Password do not match");
            return;
        }

        const signupData = {...formData, accountType};
        
        dispatch(setSignupData(signupData));
        dispatch(sendOtp(formData.email, navigate));
        
        // Reset
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
        setAccountType(ACCOUNT_TYPE.STUDENT)
    }

    return (
        <div className='flex flex-col gap-5'>
            <div className='text-white bg-[#161d29] sm:self-start self-center rounded-full py-1 flex px-1 gap-3'>
                <button className={`py-2 px-4 rounded-full ${accountType === "Student" ? 'bg-[#000814]' : 'bg-[#161d29]'} duration-300 transition-all`} 
                 onClick={() => setAccountType(ACCOUNT_TYPE.STUDENT)}>Student</button>

                <button className={`py-2 px-4 rounded-full ${accountType === "Instructor" ? 'bg-[#000814]' : 'bg-[#161d29]'} duration-300 transition-all`}
                 onClick={() => setAccountType(ACCOUNT_TYPE.INSTRUCTOR)}>Instructor</button>
            </div>

            <form>
                {/* {contain firstname and lastname} */}
                <div className='flex gap-5 min-[490px]:flex-row flex-col'>
                    <div className='lg:w-[33%]'>
                        <p className='text-white text-opacity-85'>First Name <sup className='text-[#f73f3f]'>*</sup></p>
                        
                        <input required type="text" onChange={changeHandler} placeholder="Enter First Name"
                            name="firstName" value={formData.firstName}
                            className='bg-[#161d29] py-3 px-4 rounded-lg mt-1 border-b border-b-gray-600 text-white w-full' />
                    </div>

                    <div className='lg:w-[34%]'>
                        <p className='text-white text-opacity-85'>Last Name <sup className='text-[#f73f3f]'>*</sup></p>
                        <input required type="text" onChange={changeHandler} placeholder="Enter Last Name"
                        name="lastName" value={formData.lastName}
                        className='bg-[#161d29] py-3 px-4 rounded-lg mt-1 border-b border-b-gray-600 text-white w-full' />
                    </div>
                </div>

                {/* Email Address */}
                <div className='lg:w-[70%]'>
                    <p className='text-white text-opacity-85 mt-5'>Email Address <sup className='text-[#f73f3f]'>*</sup></p>
                    
                    <input required type="email" onChange={changeHandler} placeholder="Enter Email Address"
                        name="email" value={formData.email}
                        className='w-full bg-[#161d29] py-3 px-4 rounded-lg mt-1 border-b border-b-gray-600 text-white' 
                    />
                </div>
                
                {/* Create Pass and confirm Pass */}
                <div className='flex gap-5 min-[490px]:flex-row flex-col mt-5'>
                    <div className='relative lg:w-[33%]'>
                        <p className='text-white text-opacity-85'>Create Password <sup className='text-[#f73f3f]'>*</sup></p>
                        <input required type={showCreatePass ? ("text") : ("password")} onChange={changeHandler} placeholder="Enter Password"
                         name="password" value={formData.password}
                         className='w-full bg-[#161d29] py-3 px-4 rounded-lg mt-1 border-b border-b-gray-600 text-white tracking-widest' />

                        <span onClick={() => setShowCreatePass(!showCreatePass)} className='absolute lg:right-6 right-2 top-[55%] text-2xl text-white text-opacity-75'>
                            {showCreatePass ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
                        </span>
                    </div>

                    <div className='relative lg:w-[34%]'>
                        <p className='text-white text-opacity-85'>Confirm Password <sup className='text-[#f73f3f]'>*</sup></p>
                        <input required type={showConfirmPass ? ("text") : ("password")} onChange={changeHandler} placeholder="Confirm Password"
                         name="confirmPassword" value={formData.confirmPassword} 
                         className='w-full bg-[#161d29] py-3 px-4 rounded-lg mt-1 border-b border-b-gray-600 text-white tracking-widest'
                        />

                    <span onClick={() => setShowConfirmPass(!showConfirmPass)} className='absolute lg:right-6 right-2 top-[55%] text-2xl text-white text-opacity-75'>
                        {showConfirmPass ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
                    </span>
                    </div>
                </div>

                <div className='mt-10 lg:w-[70%]' onClick={submitHandler}>
                    <CTAButton active={true}>Create Account</CTAButton>
                </div>
            </form>
        </div>
    )
}

export default SignupForm