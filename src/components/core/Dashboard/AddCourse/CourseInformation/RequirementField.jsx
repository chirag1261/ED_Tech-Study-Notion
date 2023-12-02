import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function RequirementField({name, label, errors, register, setValue, getValues}) {
    
    const { editCourse, course } = useSelector((state) => state.course)
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);

    useEffect(() => {
        if (editCourse) {
            setRequirementList(course?.instructions)
        }
        register(name, {required: true, validate: (value) => value.length > 0})
    }, [])

    useEffect(() => {
        setValue(name, requirementList)
    }, [requirementList])

    function handleAddRequirement() {
        if(requirement) {
            setRequirementList([...requirementList, requirement]);
            setRequirement('');
        }
    }

    function handlerRemoveRequirement(index) {
        const updateRequirementList = [...requirementList];
        updateRequirementList.splice(index, 1);
        setRequirementList(updateRequirementList);
    }

    return (
        <div>
            <label htmlFor={name} className='text-sm tracking-wide'>{label}<sup className='text-pink-300 text-base'>*</sup></label>
            <div>
                <input type='text' id={name} value={requirement} onChange={(e) => setRequirement(e.target.value)} className='w-full bg-richblack-700 py-3 px-4 rounded-lg mt-2 border-b border-b-richblack-100 text-richblack-5'/>
                <button type='button' onClick={handleAddRequirement} className='font-semibold text-yellow-50 mt-3'>Add</button>
            </div>

            {
                requirementList?.length > 0 && (
                    <ul>
                        {
                            requirementList?.map((requirement, index) => (
                                <li key={index} className='flex items-center text-richblack-5 gap-3'>
                                    <span>{requirement}</span>
                                    <button type='button' onClick={() => handlerRemoveRequirement(index)} className='text-[13px] text-pure-greys-300'>clear</button>
                                </li>
                            ))
                        }
                    </ul>
                )
            }

            {
                errors[name] && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">{label} is required</span>
                )
            }
        </div>
    )
}

export default RequirementField