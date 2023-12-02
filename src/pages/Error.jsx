import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div className='flex flex-col justify-center items-center text-center sm:text-3xl text-xl text-[#ff4747] min-h-[90vh]'>
      Error 404 - Page Not Found!
      <Link to={"/"}><div className='text-white sm:text-xl text-sm mt-5 bg-richblack-700 px-5 py-2 rounded-xl cursor-pointer transition-all duration-200 ease-in-out hover:bg-richblack-500'>
        Go To Home
      </div></Link>
    </div>
  )
}

export default Error