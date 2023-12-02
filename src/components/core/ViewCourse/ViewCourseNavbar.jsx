import React, { useState } from 'react'
import { AiOutlineBars } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import ProfileDropDown from '../Auth/ProfileDropDown';
import ConfirmationModal from '../../common/ConfirmationModal';

function ViewCourseNavbar({navbar, setNavbar}) {
    const {token} = useSelector((state) => state.auth);
    const [confirmationModal, setConfirmationModal] = useState(null);

    return (
        <div>
            <div className='bg-richblack-800 py-3 min-h-[50px] border-l border-richblack-700 sm:px-5 px-3 flex justify-between'>
                <div>
                    <AiOutlineBars className='text-2xl text-richblack-300 cursor-pointer' onClick={() => setNavbar(!navbar)}/>
                </div>

                <div>
                    {
                        token !== null && (
                            <ProfileDropDown setConfirmationModal={setConfirmationModal}/>
                        )
                    }
                </div>
            </div>

            { confirmationModal && <ConfirmationModal modalData={confirmationModal}/> }
        </div>
    )
}

export default ViewCourseNavbar