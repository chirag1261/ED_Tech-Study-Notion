import React from 'react'
import { Link } from 'react-router-dom'

function Button({children, active, linkto}) {
  return (
    <Link to={linkto}>
        <div className={`text-center px-5 py-3 rounded-md font-bold ${active ? 'bg-yellow-50 text-black' : 'bg-richblack-800'} 
          hover:scale-95 transition-all duration-200 sm:text-base text-[10px] border-b-[1px] border-r-[1px] border-white`}>
            {children}
        </div>
    </Link>
  )
}

export default Button