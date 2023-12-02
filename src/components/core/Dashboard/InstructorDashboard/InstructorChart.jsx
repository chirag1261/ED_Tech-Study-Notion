import React, { useState } from 'react'
import { Chart, registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';

Chart.register(...registerables);

function InstructorChart({courses}) {
    const [currChart, setCurrChart] = useState("students");

    function getRandomColors(numColors) {
        const colors = [];
        for(let i=0; i<numColors; i++) {
            const color = `rgb(
                ${Math.floor(Math.random() * 256)}, 
                ${Math.floor(Math.random() * 256)},
                ${Math.floor(Math.random() * 256)} 
            )`

            colors.push(color);
        }

        return colors;
    }

    //StudentInfo - Chart Display
    const chartDataForStudents = {
        labels: courses?.map((course) => course?.courseName),
        datasets: [
            {
                data: courses?.map((course) => course?.totalStudentsEnrolled),
                backgroundColor: getRandomColors(courses?.length),
            }
        ]
    }

    //incomeInfo - Chart Display
    const chartDataForIncome = {
        labels: courses?.map((course) => course?.courseName),
        datasets: [
            {
                data: courses?.map((course) => course?.totalAmountGenerated),
                backgroundColor: getRandomColors(courses?.length),
            }
        ]
    }

    //options
    const options = {

    };

    return (
        <div className='flex flex-col gap-3 '>
            <p className='text-richblack-5 tracking-wide font-semibold'>Visualise</p>
            <div className='flex gap-2'>
                <button onClick={() => setCurrChart("students")} className={`px-5 py-2 ${currChart === 'students' ? 'bg-richblack-700 rounded-sm' : 'text-opacity-30'} text-yellow-50 font-bold tracking-wide`}>Students</button>
                <button onClick={() => setCurrChart("income")} className={`px-5 py-2 ${currChart === 'income' ? 'bg-richblack-700 rounded-sm' : 'text-opacity-30'} text-yellow-50 font-bold tracking-wide`}>Income</button>
            </div>

            <div className='w-full'>
                <Pie data={currChart === 'students' ? chartDataForStudents : chartDataForIncome} options={options} className='sm:w-[600px] sm:max-h-[400px] sm:mx-auto w-full h-full'/>
            </div>
        </div>
    )
}

export default InstructorChart