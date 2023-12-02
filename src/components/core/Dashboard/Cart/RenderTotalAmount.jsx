import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn';
import { buyCourse } from '../../../../services/operations/StudentFeatureAPI';
import { useNavigate } from 'react-router-dom';

function RenderTotalAmount() {
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {total, cart} = useSelector((state) => state.cart);

    function handleBuyCourse() {
        const courses = cart.map((course) => course?._id);
        // console.log("Bought these courses", courses)

        if(token) {
            buyCourse(courses, token, user, navigate, dispatch);
            return;
        }
    }

    return (
        <div className='bg-richblack-800 p-5 mt-5 rounded-lg'>
            <p className='text-richblack-300 tracking-wide'>Total: </p>
            <p className='text-2xl text-yellow-50 font-bold tracking-wide'>{total}</p>
            <p className='text-sm my-2 text-richblack-400 font-semibold tracking-wide line-through'>{total + 1000}</p>

            <div className='mt-5 w-full'>
                <IconBtn text={"Buy Now"} customClasses={"w-full flex item-center justify-center"} onclick={handleBuyCourse}/>
            </div>
        </div>
    )
}

export default RenderTotalAmount