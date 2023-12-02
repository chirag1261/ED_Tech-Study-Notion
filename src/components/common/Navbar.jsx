import React from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsChevronDown } from 'react-icons/bs';
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { useState } from 'react'
import { useEffect } from 'react'
import { apiConnector } from '../../services/apiConnector'
import { categories } from '../../services/api'
import { FaBars } from 'react-icons/fa';
import Sidebar from './Sidebar'
import ConfirmationModal from './ConfirmationModal'

function Navbar() {
    const [bar, setBar] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);

    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false)

    const fetchSubLinks = async() => {
        setLoading(true);
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            setSubLinks(result.data.allCategories);
        }
        catch(error) {
            // console.log("NO Fetch List", error);
        }
        setLoading(false);
    }

    useEffect(() => {   
        fetchSubLinks();
    }, []);

    const location = useLocation();
    function matchRoute(route) {
        return matchPath({path:route}, location.pathname);
    }
    
    const [confirmationModal, setConfirmationModal] = useState(null);


    return (
        <div className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${matchRoute("/") ? 'bg-richblack-900' : 'bg-richblack-800'}`}>
            <div className='flex w-11/12 max-w-maxContent items-center justify-between'>

                <div className={`flex gap-5 items-center w-full md:w-auto ${token !== null ? 'justify-start' : 'justify-between'}`}>
                    
                    {/* Bars */}
                    <div className='md:hidden block' onClick={() => setBar(!bar)}>
                        <FaBars className='text-richblack-300 text-xl'/>
                    </div>

                    {/* Sidebar */}
                    <div className={`cursor-pointer fixed left-0 top-0 bottom-0 transform transition-all duration-200 ${bar ? 'translate-x-0' : '-translate-x-full'} z-[30]`}>
                        <Sidebar bar={bar} setBar={setBar} subLinks={subLinks} matchRoute={matchRoute} token={token} user={user} setConfirmationModal={setConfirmationModal}/>
                    </div>

                    {/* When Sidebar Open it will be visible */}
                    <div className={`fixed inset-0 z-[20] ${bar ? 'visible' : 'hidden'} backdrop-blur-sm`} onClick={() => setBar(!bar)}></div>
                
                    {/* Image */}
                    <Link to={"/"}>
                        <img src={Logo} width={160} height={42} alt=''/>
                    </Link>
                </div>

                {/* Nav Links */}
                <nav>
                    <ul className='md:flex hidden gap-6 text-richblack-25'>
                        {
                            NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {
                                        link.title === "Catalog" ?
                                        <div className='relative flex gap-2 items-center group cursor-pointer'>
                                            <p>{link.title}</p>
                                            <BsChevronDown/>

                                            <div className=' w-[300px] invisible absolute left-[50%] -top-[150%] flex flex-col rounded-md bg-richblack-5 p-4
                                             text-richblue-900 opacity-0 transition-all duration-200 ease-in group-hover:visible group-hover:opacity-100 group-hover:z-10
                                             translate-x-[-50%] translate-y-[50%]'>
                                            
                                                {/* Diamond rectangle */}
                                                <div className='absolute left-[50%] top-0 h-6 w-6 rotate-45 
                                                    rounded-[4px] bg-richblack-5 translate-y-[-40%] translate-x-[80%]'>
                                                </div>

                                                {   loading ? (<p className="text-center">Loading...</p>) : 
                                                    subLinks.length ? (
                                                        subLinks.map((subLink, i) => (
                                                            <Link 
                                                                to={`/catalog/${subLink.name
                                                                    .split(" ")
                                                                    .join("-")
                                                                    .toLowerCase()}`}
                                                                className='hover:bg-richblack-100 px-3 py-2 rounded-lg z-[10]' key={i}>
                                                                {subLink?.name}
                                                            </Link>
                                                        ))
                                                    ) : (<div className='text-black flex items-center justify-center'>Loading...</div>)
                                                }
                                            </div>
                                        </div> :
                                        (<Link to={link?.path}>
                                            <p className={`${matchRoute(link?.path) ? 'text-yellow-25' : ''}`}>
                                                {link.title}
                                            </p>
                                        </Link>)
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                {/* Login/signup/dashboard */}
                <div className='flex gap-4 items-center'>
                    {
                        user && user?.accountType !== "Instructor" && (
                            <Link to={"/dashboard/cart"} className='relative md:block hidden'>
                                <AiOutlineShoppingCart className='text-richblack-100 text-2xl'/>
                                {
                                    totalItems > 0 &&
                                    <span className='bg-richblack-600 rounded-full px-[7px] py-[1px] text-brown-100 font-bold text-[12px] absolute -bottom-2 -right-3 animate-bounce'>
                                        {totalItems}
                                    </span>
                                    
                                }
                            </Link>
                        )
                    }

                    {
                        token === null && (
                            <Link to={"/login"} className='md:block hidden'>
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                                 text-richblack-100 rounded-md hover:scale-90 transition-all duration-300 shadow-md hover:shadow-white hover:text-white'>
                                    Log In
                                </button>
                            </Link>
                        )
                    }

                    {
                        token === null && (
                            <Link to={"/signup"} className='md:block hidden'>
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                                    text-richblack-100 rounded-md hover:scale-90 transition-all duration-300 shadow-md hover:shadow-white hover:text-white'>
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }

                    {
                        token !== null && (
                            <ProfileDropDown setConfirmationModal={setConfirmationModal}/>
                        )
                    }
                </div>

            </div>

            

            {   confirmationModal && <ConfirmationModal modalData={confirmationModal}/> }
        </div>
    )
}

export default Navbar