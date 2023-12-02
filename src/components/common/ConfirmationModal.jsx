import React from 'react'
import IconBtn from './IconBtn'

function ConfirmationModal({modalData}) {
    return (
        <div className='fixed inset-0 flex items-center justify-center backdrop-blur-md z-[30]'>
            <div className='border border-white border-opacity-20 rounded-md py-5 px-7 w-[320px] mx-3 bg-richblack-800'>
                <p className='text-2xl font-semibold text-richblack-5'>{modalData.text1}</p>
                <p className='my-5 text-richblack-300'>{modalData.text2}</p>
                <div className='flex gap-3'>
                    <IconBtn onclick={modalData?.btn1Handler} text={modalData?.btn1Text}/>
                    <button onClick={modalData?.btn2Handler} className='py-2 px-5 rounded-md bg-richblack-300 font-bold text-black'>{modalData.btn2Text}</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal