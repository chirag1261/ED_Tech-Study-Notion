import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';
import Loader from '../components/common/Loader';

function Dashboard() {
    const {loading: authLoading} = useSelector((state) => state.auth);
    const {loading: profileLoading} = useSelector((state) => state.profile);

    if(profileLoading || authLoading) {
        return (
            <div className='w-full flex items-center justify-center min-h-[calc(100vh-3.5rem)]'><Loader/></div>
        )
    }

    return (
        <div className='relative flex md:flex-row flex-col min-h-[calc(100vh-3.5rem)]'>
            <div className='hidden md:block'>
                <Sidebar/>
            </div>

            <div className='h-[calc(100vh-3.5rem)] overflow-auto w-full'>
                <div className='mx-auto w-11/12 max-w-[1000px] py-7'>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard