import React from 'react'

const stats = [
    {count: "5K", label: "Active Students"},
    {count: "10+", label: "Mentors"},
    {count: "200+", label: "Courses"},
    {count: "50+", label: "Awards"},
];

function StatsComponent() {
    return (
        <div className=''>
            <div className='flex flex-wrap gap-10 justify-evenly'>
                {stats.map((data, i) => (
                    <div key={i} className='text-white flex flex-col items-center '>
                        <p className='text-3xl font-bold'>{data.count}</p>
                        <p className='text-[17px] text-richblack-300'>{data.label}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StatsComponent