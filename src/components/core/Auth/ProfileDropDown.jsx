import React, { useRef, useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { fetchUserDetails } from '../../../services/operations/profileAPI';

import useOnClickOutside from '../../../hooks/useOnClickOutside'
import { logout } from '../../../services/operations/authAPI';

function ProfileDropDown({setConfirmationModal}) {
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchUserDetails(token));
    }, [dispatch])
    
    const [open, setOpen] = useState(false)
    const ref = useRef(null)
    useOnClickOutside(ref, () => setOpen(false))

    if (!user) return null;

    function handleLogout() { 
        setOpen(false); 
        setConfirmationModal({
            text1: "Are You Sure?",
            text2: "You will be logged out of your Account.",
            btn1Text: "Logout",
            btn2Text: "Cancel",
            btn1Handler: () => { dispatch(logout(navigate)); setConfirmationModal(null)},
            btn2Handler: () => setConfirmationModal(null),
        });
    }

    return (
        <button className="relative" onClick={() => setOpen(true)}>
            <div className="flex items-center gap-x-1">
                <img src={user?.image?.image_url} alt={`profile-${user?.firstName}`} className="aspect-square w-[30px] rounded-full object-cover"/>
                <AiOutlineCaretDown className="text-sm text-richblack-100" />
            </div>


            {
                open && 
                <div onClick={(e) => e.stopPropagation()} ref={ref} className="absolute top-[118%] right-0 z-[1000] divide-y-[1px]
                    divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800">

                    <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
                        <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                            <VscDashboard className="text-lg" />
                            Dashboard
                        </div>
                    </Link>

                    <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
                        onClick={handleLogout}>
                            <VscSignOut className="text-lg" />
                            Logout
                    </div>
                </div>
            }
        </button>
    )
}

export default ProfileDropDown