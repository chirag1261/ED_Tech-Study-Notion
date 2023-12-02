import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import {BsCameraVideo} from 'react-icons/bs';

function AccordianBar({section, isActive, handleActive }) {
    const contentEL = useRef(null);

    const [active, setActive] = useState(false);
    useEffect(() => {
        setActive(isActive?.includes(section?._id));
    }, [isActive]);
    
    const [sectionHeight, setSectionHeight] = useState(0)
    useEffect(() => {
        setSectionHeight(active ? contentEL.current.scrollHeight : 0)
    }, [active])

    return (
        <div>
            <div className='flex justify-between items-center py-5 border border-richblack-500 bg-richblack-700 cursor-pointer' onClick={() => handleActive(section?._id)}>
                <div className='w-full flex justify-between px-5'>
                    <div className='flex items-center gap-4 '>
                        <AiOutlineDown className={`text-richblack-300 ${isActive.includes(section?._id) ? 'transform rotate-180' : 'transform rotate-0'}  transition-all duration-300`}/>
                        <p className='text-richblack-25'>{section.sectionName}</p>
                    </div>

                    <p className='text-yellow-25'><span>{section?.subSection?.length}</span> Lecture <span>{`(s)`}</span></p>
                </div>
            </div>

            <div  ref={contentEL} style={{height: sectionHeight}} className={`relative h-0 overflow-hidden bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease]`}>
            {
                section?.subSection && section.subSection === 0 ? <p>No Lectures Found</p> :
                section.subSection.map((sub, index) => (
                    <div className=' border-l border-r border-b border-richblack-500 px-5 flex gap-3 items-center py-4' key={index}>
                        <BsCameraVideo/>
                        <p>{sub.title}</p>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default AccordianBar