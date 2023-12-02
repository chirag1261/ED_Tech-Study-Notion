import React, { useEffect, useRef, useState } from 'react'
import AccordianBar from './AccordianBar';
import { duration } from '../../../utils/courseDuration';

function CourseContent({courseContent}) {

    function subSectionCountHandle() {
        let count = 0;
        let totalDuration = 0;
      
        for (const section of courseContent) {
            count += section?.subSection?.length || 0;
      
            for (const subSection of section?.subSection || []) {
                totalDuration += parseFloat(subSection.timeDuration) || 0;
            }
        }
      
        return { count, totalDuration };
    }
      
    const { count, totalDuration } = subSectionCountHandle();

    const [isActive, setIsActive] = useState([]);
    function handleActive(id) {
        setIsActive(
            !isActive.includes(id) ? 
            isActive.concat([id]) :  //Add
            isActive.filter((e) => e != id)  //Remove
        )
    }
      
    return (
        <>
        {
            courseContent && courseContent.length < 0 ? <div>No Sections Found-</div> :
            <div className='flex flex-col mt-3'>
                <div className='flex sm:justify-between w-full sm:flex-row flex-col items-center justify-center gap-3'>
                    <div className='flex gap-3'>
                        <p><span>{courseContent.length}</span> section<span>{`(s)`}</span></p>
                        <p><span>{count}</span> lecture<span>{`(s)`}</span></p>
                        <p><span>{duration(totalDuration)}</span> total length</p>
                    </div>
                    
                    <div>
                        <p className='text-yellow-25 cursor-pointer' onClick={() => setIsActive([])}>Collapse all Sections</p>
                    </div>
                </div>

                <div className='mt-5'>
                    {
                        courseContent?.map((section, index) => (
                            <AccordianBar
                                section={section}
                                key={index}
                                isActive={isActive}
                                handleActive={handleActive}
                            />
                        ))
                    }
                </div>
            </div>
        }
        </>
    )
}

export default CourseContent