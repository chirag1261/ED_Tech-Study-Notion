import React, { useRef, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { NavbarLinks } from '../../data/navbar-links'
import { Link, useNavigate } from 'react-router-dom'
import { BsChevronDown, BsChevronRight } from 'react-icons/bs';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { sidebarLinks } from '../../data/dashboard-links';
import SidebarLink from '../core/Dashboard/SidebarLink';
import { VscSignOut } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { logout } from '../../services/operations/authAPI';

function Sidebar({bar, setBar, subLinks, matchRoute, token, user, setConfirmationModal}) {
    
    const [open, setOpen] = useState(false)
    const ref = useRef(null)
    useOnClickOutside(ref, () => setOpen(false))

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogout() {
        setConfirmationModal({
            text1: "Are You Sure?",
            text2: "You will be logged out of your Account.",
            btn1Text: "Logout",
            btn2Text: "Cancel",
            btn1Handler: () => { dispatch(logout(navigate)); setConfirmationModal(null)},
            btn2Handler: () => setConfirmationModal(null),
        });
        
        setBar(!bar);
    }

    return (
        <div className='h-full bg-richblack-800 min-w-[250px] flex flex-col relative'>
            {/* Cross Icon */}
            <div className='w-fit text-richblack-500 pl-5 pt-5 text-2xl' onClick={() => setBar(!bar)}>
                <RxCross2/>
            </div>

            {/* Nav Links */}
            <nav>
                <ul className='flex flex-col mt-5 text-sm'>
                    {
                        NavbarLinks.map((link, index) => (
                            link.title === "Catalog" ?
                            <div className='relative flex gap-2 items-center cursor-pointer  text-richblack-300' key={index} onClick={() => setOpen(true)}>
                                <p className='px-8 py-2'>{link.title}</p>
                                <BsChevronRight className='min-[430px]:block hidden'/>
                                <BsChevronDown className='min-[430px]:hidden block'/>

                                { 
                                    open && 
                                    <div className={`w-[300px] absolute flex flex-col rounded-md bg-richblack-5 p-4
                                        text-richblue-900 transition-all duration-200 ease-in z-10
                                        min-[430px]:translate-x-[40%] min-[430px]:translate-y-[35%] translate-y-[60%]`}  onClick={(e) => e.stopPropagation()} ref={ref}>
                                    
                                        {/* Diamond rectangle */}
                                        <div className='absolute min-[430px]:top-[13%] h-6 w-6 rotate-45
                                            rounded-[4px] bg-richblack-5 min-[430px]:translate-y-[-40%] min-[430px]:translate-x-[-90%] translate-x-32 -translate-y-6'>
                                        </div>

                                        {   
                                            subLinks.length ? (
                                                subLinks.map((subLink, i) => (
                                                    <Link 
                                                        to={`/catalog/${subLink.name
                                                            .split(" ")
                                                            .join("-")
                                                            .toLowerCase()}`}
                                                        className='hover:bg-richblack-100 px-3 py-2 rounded-lg z-[10]' key={i} onClick={() => {setBar(!bar); setOpen(false) }}>
                                                        {subLink?.name}
                                                    </Link>
                                                ))
                                            ) : (<div className='text-black flex items-center justify-center'>Loading...</div>)
                                        }
                                    </div>
                                }
                            </div> :
                            <Link to={link?.path} key={index} onClick={() => setBar(!bar)}>
                                <p className={`px-8 py-2 ${matchRoute(link?.path) ? 'text-yellow-100 bg-yellow-800 border-l-4 border-l-yellow-100 font-bold' : ' text-richblack-300'}`}>
                                    {link?.title}
                                </p>
                            </Link>
                        ))
                    }
                </ul>
            </nav>
            
            <div className='mx-auto my-6 h-[1px] w-10/12 bg-richblack-600'></div>

            {/* Login and Signup */}
            {
                token === null && (
                    <Link to={"/login"} onClick={() => setBar(!bar)}>
                        <p className={`px-8 py-2 text-sm ${matchRoute('/login') ? 'text-yellow-100 bg-yellow-800 border-l-4 border-l-yellow-100 font-bold' : 'text-richblack-300'}`}>Login</p>
                    </Link>
                )
            }

            {
                token === null && (
                    <Link to={"/signup"} onClick={() => setBar(!bar)}>
                        <p className={`px-8 py-2 text-sm ${matchRoute('/signup') ? 'text-yellow-100 bg-yellow-800 border-l-4 border-l-yellow-100 font-bold' : 'text-richblack-300'}`}>Sign Up</p>
                    </Link>
                )
            }

            {
                token !== null &&
                <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800'>
                
                    <div className='flex flex-col'>
                        {
                            sidebarLinks.map((link) => {
                                if (link?.type && user?.accountType !== link.type) {
                                    return null;
                                }

                                return (
                                    <SidebarLink key={link.id} link={link} iconName={link.icon} isTrue={true} setBar={setBar} bar={bar} />
                                    
                                );
                            })
                        }
                    </div>

                    <div className='mx-auto my-6 h-[1px] w-10/12 bg-richblack-600'></div>
                    
                    <div className='flex flex-col'>
                        <SidebarLink link={{name: "Settings", path:'dashboard/settings'}}
                            iconName={"VscSettingsGear"} isTrue={true} setBar={setBar} bar={bar}
                        />

                        <button onClick={handleLogout} className='text-sm font-medium text-richblack-300 mt-3'>

                            <div className='flex items-center gap-2 pl-7'>
                                <VscSignOut fontSize={'1.5rem'}/>
                                <span>Logout</span>
                            </div>
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Sidebar