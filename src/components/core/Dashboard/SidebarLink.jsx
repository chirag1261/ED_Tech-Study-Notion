import React from 'react'
import * as Icons from 'react-icons/vsc'
import { NavLink, matchPath, useLocation } from 'react-router-dom';

function SidebarLink({link, iconName, isTrue, setBar, bar}) {
    const Icon = Icons[iconName];
    const location = useLocation();

    function matchRoute(route) {
        return matchPath({path: route}, location.pathname);
    }

    function handlerBarClose() {
        if(isTrue) {
            setBar(!bar);
        }
    }

    return (
        <NavLink to={link.path} className={`text-richblack-300 relative px-8 py-2 text-sm font-medium ${matchRoute(link.path) ? 'bg-yellow-800' : 'bg-opacity-0'}`} onClick={handlerBarClose}>
            <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${matchRoute(link.path) ? 'opacity-100' : 'opacity-0'}`}></span>
            <div className={`flex items-center gap-2 ${matchRoute(link.path) ? 'text-yellow-50 font-medium' : ''}`}>
                <Icon className='text-lg'/>
                <span>{link.name}</span>
            </div>
        </NavLink>
    )
}

export default SidebarLink