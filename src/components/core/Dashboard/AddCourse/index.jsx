import RenderSteps from "./RenderSteps";
import { MdOutlineBolt } from 'react-icons/md'

export default function AddCourse() {
    return (
        <>
            <div className="text-richblack-5 flex gap-6 pt-3 pb-10 lg:flex-row flex-col-reverse ">
                <div className="lg:w-[60%] w-full">
                    <p className="text-3xl tracking-wide">Add Course</p>

                    <div>
                        <RenderSteps/>
                    </div>
                </div>

                <div className="text-sm lg:w-[40%] w-full bg-richblack-800 place-self-start border border-opacity-10 border-white rounded-md p-5 lg:sticky lg:top-10">
                    <p className="text-lg tracking-wide flex gap-2 items-center"><MdOutlineBolt className="text-[#ff6633] text-2xl"/>Course Upload Tips</p>
                    <ul className="mt-7 list-disc pl-5 flex flex-col gap-3 text-[13px]">
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                        <li>Video section controls the course overview video.</li>
                        <li>Course Builder is where you create & organize a course.</li>
                        <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                        <li>Information from the Additional Data section shows up on the course single page.</li>
                        <li>Make Announcements to notify any important</li>
                        <li>Notes to all enrolled students at once.</li>
                    </ul>
                </div>
            </div>
        </>
    )
}