import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { RiDeleteBinLine } from 'react-icons/ri';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import { changePassword, changeProfileInfo, deleteAccount, uploadProfilePic } from '../../../services/operations/settingsAPI';
import { useRef } from 'react';
import ConfirmationModal from '../../common/ConfirmationModal';
import { useForm } from 'react-hook-form';

const genders = ["Choose Gender", "Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

function Settings() {
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit, setValue, formState: {errors}} = useForm();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const [confirmationModal, setConfirmationModal] = useState(null);

    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    // To change the profile pic on Img tag
    function changeHandler(event) { 
        if (event.target.files && event.target.files[0]) {
            setSelectedImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    //Call backend to change profile pic
    function uploadImage() {
        if (fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files[0]) {
          dispatch(uploadProfilePic(fileInputRef.current.files[0], token, navigate));
        }
    }

    // when user present setValue
    useEffect(() => {
        setValue("firstName", user?.firstName);
        setValue("lastName", user?.lastName);
        setValue("dateOfBirth", user?.additionalDetails?.dateOfBirth);
        setValue("gender", user?.additionalDetails?.gender || "Choose Gender");
        setValue("contactNumber", user?.additionalDetails?.contactNumber);
        setValue("about", user?.additionalDetails?.about);
    }, [user])

    // Delete Account
    function deleteAccountHandler() {
        setConfirmationModal({
            text1: "Are You Sure?",
            text2: "Your account will be permanently deleted.",
            btn1Text: "Delete",
            btn2Text: "Cancel",
            btn1Handler: () => dispatch(deleteAccount(token)),
            btn2Handler: () => setConfirmationModal(null),
        })
    }

    function profileHandler(data) {
        dispatch(changeProfileInfo(data, token, navigate))
    }

    return (
        <div className='pb-10'>
            <p className='text-richblack-5 text-3xl font-semibold'>Edit Profile</p>

            {/* Section 1 */}
            <div className='bg-richblack-800 mt-12 sm:px-12 px-3 py-8 rounded-lg flex justify-between items-center border border-white border-opacity-10'>
                <div className='flex items-center gap-4 min-[315px]:flex-row flex-col w-full'>

                    <img src={selectedImage || user?.image?.image_url} alt={`${user?.firstName}`} className='aspect-square min-[350px]:w-[78px] w-[60px] rounded-full object-cover'/>
                    
                    <div className='space-y-2'>
                        <p className='text-richblack-5 max-[315px]:text-center'>Change Profile Picture</p>
                        <div className='flex gap-3'>
                            <label htmlFor='file' className='py-2 px-5 bg-richblack-700 rounded-md text-richblack-50 font-semibold cursor-pointer'>Select</label>
                            <input
                                type='file' accept="image/*" id='file' onChange={changeHandler} ref={fileInputRef} style={{display:"none"}} />
                            
                            <IconBtn text={"Upload"} onclick={uploadImage} />
                        </div>
                    </div>
                    
                </div>
            </div>

            {/* Section 2 */}
            <form onSubmit={handleSubmit(profileHandler)}>
                <div className='bg-richblack-800 mt-10 sm:px-12 px-5 py-8 rounded-lg border border-white border-opacity-10'>
                    <p className='text-richblack-5 text-lg font-semibold'>Profile Information</p>

                    <div className='grid sm:grid-cols-2 grid-cols-1 mt-5 gap-5'>
                        <div>
                            <p className='text-richblack-5 text-sm'>First Name</p>
                            <input type="text" placeholder="Enter First Name" name="firstName" {...register("firstName", {required: true})}
                                className='bg-richblack-700 mt-2 py-3 px-4 rounded-lg border-b border-b-gray-600 text-white w-full' />
                            {
                                errors.firstName && 
                                <span className='text-yellow-100'>Please enter first name</span>
                            }
                        </div>

                        <div>
                            <p className='text-richblack-5 text-sm'>Last Name</p>
                            <input type="text" placeholder="Enter Last Name" name="lastName" {...register("lastName", {required: true})}
                                className='bg-richblack-700 mt-2 py-3 px-4 rounded-lg border-b border-b-gray-600 text-white w-full' />
                            {
                                errors.lastName && 
                                <span className='text-yellow-100'>Please enter last name</span>
                            }
                        </div>

                        <div>
                            <p className='text-richblack-5 text-sm'>Date of Birth</p>
                            <input type="date" placeholder="dd-mm-yyyy" name="dateOfBirth" {...register("dateOfBirth", {required: true})}
                                className='bg-richblack-700 mt-2 py-3 px-4 rounded-lg border-b border-b-gray-600 text-white w-full' />
                            {
                                errors.dateOfBirth && 
                                <span className='text-yellow-100'>Please provide Date of Birth</span>
                            }
                        </div>

                        <div>
                            <p className='text-richblack-5 text-sm'>Gender</p>
                            <select name='gender' {...register("gender", { required: true, validate: value => value !== "Choose Gender" })}
                            className='bg-richblack-700 mt-2 py-3 px-4 rounded-lg border-b border-b-gray-600 text-white w-full cursor-pointer'>
                                {genders.map((g, index) => (
                                    <option key={index} value={g}>{g}</option>
                                ))}
                            </select>
                            {
                                errors.gender?.type === 'validate' && 
                                <span className='text-yellow-100'>Please provide Gender</span>
                            }
                        </div>

                        <div>
                            <p className='text-richblack-5 text-sm'>Contact Number</p>
                            <input type="number" placeholder="01234 56789" name="contactNumber" {...register("contactNumber", {required: true})}
                                className='bg-richblack-700 mt-2 py-3 px-4 rounded-lg border-b border-b-gray-600 text-white w-full' />
                            {
                                errors.contactNumber && 
                                <span className='text-yellow-100'>Please enter Contact Number</span>
                            }
                        </div>

                        <div>
                            <p className='text-richblack-5 text-sm'>About</p>
                            <input type="text" placeholder="Tell about yourself" name="about" {...register("about", {required: true})}
                                className='bg-richblack-700 mt-2 py-3 px-4 rounded-lg border-b border-b-gray-600 text-white w-full' />
                            {
                                errors.about && 
                                <span className='text-yellow-100'>Please enter about yourself</span>
                            }
                        </div>
                    </div>
                </div>

                <div className='my-10 flex justify-end gap-2'>
                    <button onClick={() => navigate("/dashboard/my-profile")} className='py-2 px-5 bg-richblack-700 rounded-md text-richblack-100 font-semibold'>Cancel</button>
                    <IconBtn text={"Save"} type={'submit'} />
                </div>
            </form>

            {/* Section 3 */}
            <div className='bg-richblack-800 sm:px-12 px-5 py-8 rounded-lg border border-white border-opacity-10'>
                <p className='text-richblack-5 text-lg font-semibold'>Password</p>

                <div className='grid sm:grid-cols-2 grid-cols-1 mt-5 gap-5'>
                    <div className='relative'>
                        <p className='text-richblack-5 text-sm'>Current Password</p>
                        <input type={showCurrentPassword ? ("text") : ("password")} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Current Password" name="currentPassword" value={currentPassword}
                            className='bg-richblack-700 mt-2 py-3 px-4 rounded-lg border-b border-b-gray-600 text-white w-full' />

                        <span onClick={() => setShowCurrentPassword(!showCurrentPassword)} className='absolute lg:right-6 right-2 top-[55%] text-2xl text-white text-opacity-75'>
                            {showCurrentPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
                        </span>
                    </div>

                    <div className='relative'>
                        <p className='text-richblack-5 text-sm'>New Password</p>
                        <input type={showNewPassword ? ("text") : ("password")} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" name="newPassword" value={newPassword}
                            className='bg-richblack-700 mt-2 py-3 px-4 rounded-lg border-b border-b-gray-600 text-white w-full' />
                        
                        <span onClick={() => setShowNewPassword(!showNewPassword)} className='absolute lg:right-6 right-2 top-[55%] text-2xl text-white text-opacity-75'>
                            {showNewPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
                        </span>
                    </div>
                </div>
            </div>
            
            <div className='my-10 flex justify-end gap-2'>
                <button onClick={() => navigate("/dashboard/my-profile")} className='py-2 px-5 bg-richblack-700 rounded-md text-richblack-100 font-semibold'>Cancel</button>
                <IconBtn text={"Update"} onclick={() => dispatch(changePassword(currentPassword, newPassword, token))} />
            </div>

            {/* Section 4 */}
            <div className='bg-pink-900 sm:px-12 px-5 py-8 rounded-lg border border-white border-opacity-10 flex gap-5'>
                <div className='text-pink-200 min-w-[60px] h-[60px] bg-pink-700 items-center justify-center rounded-full min-[350px]:flex hidden'>
                    <RiDeleteBinLine fontSize={'2rem'}/>
                </div>

                <div>
                    <p className='text-richblack-5 text-lg font-semibold'>Delete Account</p>
                    
                    <p className='text-pink-50 mt-3'>Would you like to delete account?</p>
                    <p className='text-pink-50 lg:w-[60%]'>This account may contain Paid Courses. Deleting your account is permanent and will remove all the contain associated with it.</p>
                    <p className='text-pink-300 italic text-[17px] mt-2 cursor-pointer' onClick={deleteAccountHandler}>I want to delete my account</p>
                </div>
            </div>

            {   confirmationModal && 
                <div className='fixed inset-0 flex items-center justify-center z-[20]'>
                    <ConfirmationModal modalData={confirmationModal}/>
                </div>
            }

            {
                confirmationModal && 
                <div className='fixed inset-0 z-[10] bg-richblack-900 backdrop-filter backdrop-blur bg-opacity-50'></div>
            }
        </div>
    )
}

export default Settings