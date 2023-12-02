import React from 'react'
import {sidebarLinks} from '../../../data/dashboard-links'
import {logout} from '../../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { VscSignOut } from 'react-icons/vsc'
import ConfirmationModal from '../../common/ConfirmationModal'

function Sidebar() {
    const {user, loading: profileLoading} = useSelector((state) => state.profile);
    const {loading: authLoading} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [confirmationModal, setConfirmationModal] = useState(null);

    if(profileLoading || authLoading) {
        return (
            <div>Loading...</div>
        )
    }
    
    return (
        <div className='relative'>
            <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10'>
                
                <div className='flex flex-col'>
                    {
                        sidebarLinks.map((link) => {
                            if (link?.type && user?.accountType !== link.type) {
                                return null;
                            }

                            return (
                                <SidebarLink key={link.id} link={link} iconName={link.icon} isTrue={false} />
                            );
                        })
                    }
                </div>

                <div className='mx-auto my-6 h-[1px] w-10/12 bg-richblack-600'></div>
                
                <div className='flex flex-col'>
                    <SidebarLink link={{name: "Settings", path:'dashboard/settings'}}
                        iconName={"VscSettingsGear"} isTrue={false}
                    />

                    <button onClick={() => setConfirmationModal({
                        text1: "Are You Sure?",
                        text2: "You will be loggd out of your Account",
                        btn1Text: "Logout",
                        btn2Text: "Cancel",
                        btn1Handler: () => { dispatch(logout(navigate)); setConfirmationModal(null)},
                        btn2Handler: () => setConfirmationModal(null),
                    })} className='text-sm font-medium text-richblack-300 mt-3'>

                        <div className='flex items-center gap-2 pl-7'>
                            <VscSignOut fontSize={'1.5rem'}/>
                            <span>Logout</span>
                        </div>
                    </button>
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

export default Sidebar