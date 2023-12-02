import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { HiPencilAlt } from 'react-icons/hi';

function MyProfile() {
    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();

    return (
        <div className='pb-10'>
            <p className='text-richblack-5 text-3xl font-semibold'>My Profile</p>
            
            {/* Section 1 */}
            <div className='bg-richblack-800 mt-12 sm:px-12 px-3 py-8 rounded-lg flex justify-between items-center border border-white border-opacity-10 min-[500px]:flex-row flex-col gap-5'>
                <div className='flex items-center gap-4'>
                    <img src={user?.image?.image_url} alt={`${user?.firstName}`} className='aspect-square w-[78px] rounded-full object-cover'/>
                    <div className='space-y-1'>
                        <p className='font-bold text-lg text-richblack-5'>{user?.firstName + " " + user?.lastName}</p>
                        <p className='text-richblack-300 text-sm'>{user?.email}</p>
                    </div>
                </div>

                <IconBtn text={"Edit"} onclick={() => navigate("/dashboard/settings")} ><HiPencilAlt/></IconBtn>
            </div>

            {/* Section 2 */}
            <div className='bg-richblack-800 mt-10 sm:px-12 px-3 py-8 rounded-lg border border-white border-opacity-10'>
                <div className='flex justify-between items-center'>
                    <p className='text-richblack-5 text-lg font-semibold'>About</p>
                    <IconBtn text={"Edit"} onclick={() => navigate("/dashboard/settings")} ><HiPencilAlt/></IconBtn>
                </div>
                <p className='text-richblack-300 mt-10'>{user?.additionalDetails?.about ??  "Write something about yourself"}</p>
            </div>

            {/* Section 3 */}
            <div className='bg-richblack-800 mt-10 sm:px-12 px-3 py-8 rounded-lg border border-white border-opacity-10'>
                <div className='flex justify-between items-center'>
                    <p className='text-richblack-5 text-lg font-semibold'>Personal Details</p>
                    <IconBtn text={"Edit"} onclick={() => navigate("/dashboard/settings")} ><HiPencilAlt/></IconBtn>
                </div>

                <div className='mt-10 grid sm:grid-cols-2 grid-cols-1 lg:w-[80%] '>
                    <div>
                        <p className='text-richblack-500 text-sm'>First Name</p>
                        <p className='text-richblack-5 mt-2'>{user?.firstName}</p>
                    </div>

                    <div>
                        <p className='text-richblack-500 text-sm'>Last Name</p>
                        <p className='text-richblack-5 mt-2'>{user?.lastName}</p>
                    </div>

                    <div className='mt-5'>
                        <p className='text-richblack-500 text-sm'>Email</p>
                        <p className='text-richblack-5 mt-2'>{user?.email}</p>
                    </div>

                    <div className='mt-5'>
                        <p className='text-richblack-500 text-sm'>Phone Number</p>
                        <p className='text-richblack-5 mt-2'>{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
                    </div>

                    <div className='mt-5'>
                        <p className='text-richblack-500 text-sm'>Gender</p>
                        <p className='text-richblack-5 mt-2'>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
                    </div>

                    <div className='mt-5'>
                        <p className='text-richblack-500 text-sm'>Date of Birth</p>
                        <p className='text-richblack-5 mt-2'>{new Date(user?.additionalDetails?.dateOfBirth).toLocaleDateString("en-GB") ?? "Write your Date of Birth"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile