import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses';
import RenderTotalAmount from './RenderTotalAmount';

function Cart() {
    const  {total, totalItems} = useSelector((state) => state.cart);
    return (
        <div className='text-white pt-3 pb-10'>
            <p className='text-richblack-5 font-semibold text-3xl tracking-wide'>Cart</p>
            <p className='mt-14 text-richblack-300 tracking-wide font-semibold'>{totalItems} Courses in Cart</p>
            <hr className='mt-2 border-richblack-500'/>

            {
                total > 0 ? 
                <div className='flex lg:flex-row flex-col'>
                    <div className='lg:min-w-[80%] w-full'>
                        <RenderCartCourses/> 
                    </div>
                    
                    <div className='lg:min-w-[20%] w-full'>
                        <RenderTotalAmount/>    
                    </div>
                </div> : <p className='text-center mt-14 text-richblack-100 text-3xl tracking-wide'>Your cart is empty</p> 
            }
        </div>
    )
}

export default Cart