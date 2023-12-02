import React, { useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { useSelector } from 'react-redux';

function ChipInput({name, label, placeholder, errors, register, setValue, getValues}) {
    
    const { editCourse, course } = useSelector((state) => state.course)
    const [tag, setTag] = useState('');
    const [tagList, setTagList] = useState([]);

    useEffect(() => {
        if (editCourse) {

            setTagList(course?.tags)
        }
        register(name, {required: true, validate: (value) => value.length > 0})
    }, [])

    useEffect(() => {
        setValue(name, tagList)
    }, [tagList])

    function handleAddTag() {
        if(tag) {
            setTagList([...tagList, tag]);
            setTag('');
        }
    }

    function handlerRemoveTag(index) {
        const updateTagList = [...tagList];
        updateTagList.splice(index, 1);
        setTagList(updateTagList);
    }

  return (
    <div>
        <label htmlFor={name} className='text-sm tracking-wide'>{label}<sup className='text-pink-300 text-base'>*</sup></label>
        
        {
            tagList?.length > 0 && (
                <ul className='flex gap-3 flex-wrap my-2'>
                    {
                        tagList.map((tag, index) => (
                            <li key={index} className='flex items-center text-richblack-5 gap-3 py-1 bg-yellow-400 w-fit px-2 rounded-full'>
                                <span>{tag}</span>
                                <button type='button' onClick={() => handlerRemoveTag(index)} className='text-[13px] text-richblack-5'><RxCross2/></button>
                            </li>
                        ))
                    }
                </ul>
            )
        }

        <div>
            <input type='text' id={name} placeholder={placeholder} value={tag} onChange={(e) => setTag(e.target.value)} className='w-full bg-richblack-700 py-3 px-4 rounded-lg mt-2 border-b border-b-richblack-100 text-richblack-5' onKeyDown={ (e) => {
                if (e.key === "Enter") {
                    e.preventDefault(); handleAddTag();
                }
            }} />
        </div>

        {
            errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">{label} is required</span>
            )
        }
    </div>
  )
}

export default ChipInput