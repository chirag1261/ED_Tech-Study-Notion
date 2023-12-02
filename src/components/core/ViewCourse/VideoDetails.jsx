import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { useRef } from 'react';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import IconBtn from '../../common/IconBtn'
import Error from '../../../pages/Error'

function VideoDetails() {
	const {courseId, sectionId, subSectionId} = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();
	const playerRef = useRef();
	const {token} = useSelector((state) => state.auth);
	const {courseSectionData, courseEntireData, completedLectures} = useSelector((state) => state.viewCourse);

	const [videoData, setVideoData] = useState([]);
	const [videoEnded, setVideoEnded] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		function setVideoSpecificDetails() {
			if(!courseSectionData?.length) {
				return <Error/>;
			}

			if(!courseId && !sectionId && !subSectionId) {
				navigate("/dashboard/enrolled-courses");
			}
			else {
				const filteredData = courseSectionData?.filter((section) => section._id === sectionId)
				const filteredVideoData = filteredData?.[0]?.subSection?.filter((data) => data._id === subSectionId);

				setVideoData(filteredVideoData?.[0]);
				setVideoEnded(false);
			}
		}

		setVideoSpecificDetails();
	}, [courseSectionData, courseEntireData, location.pathname]);

	const isFirstVideo = () => {
		const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId);

		if(currentSectionIndex === 0 && currentSubSectionIndex === 0) {
			return true;
		}
		else {
			return false;
		}
	}

	const isLastVideo = () => {
		const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);

		const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId);

		if(currentSectionIndex === courseSectionData.length - 1 && currentSubSectionIndex === noOfSubSections - 1) {
			return true;
		}
		else {
			return false;
		}
	}

	function goToNextVideo() {
		const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);

		const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId);

		if(currentSubSectionIndex !== noOfSubSections - 1) {   //we are standing on any lecture but not on last
			//we have to move on next lecture in same section
			const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
			navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
		}
		else {   //we are standing on last lecture of the subsection
			//we have to move on next section's first lecture
			const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
			const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id;

			navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);
		}
	}

	function goToPrevVideo() {
		const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);

		const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId);

		if(currentSubSectionIndex !== 0) {   //we are standing on any lecture but not on first
			//we have to move prev lecture in same section
			const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id;
			navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
		}
		else {   //we are standing on first lecture of the subsection
			//we have to move prev section's last lecture
			const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;

			const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length;
			const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id;

			navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`);
		}
	}

	async function handleLectureCompletion() {
		//dummy code--
		setLoading(true);
		
		const result = await markLectureAsComplete({courseId, subSectionId}, token)
		if(result) {
			dispatch(updateCompletedLectures(subSectionId));
		}

		setLoading(false);
	}
	
	return (
		<div className='text-white sm:p-7 p-3 py-5 relative'>
			{
				!videoData ? <div>No Data Found</div> : 
				<Player ref={playerRef} onEnded={() => setVideoEnded(true)} playsInline src={videoData?.video?.url} aspectRatio='16:9' >
					{/* <AiFillPlayCircle /> */}
					
					{
						videoEnded && 
						<div className='absolute z-[3] inset-0 flex items-center font-inter justify-center gap-3 flex-col bg-pure-greys-900 bg-opacity-75'>
							{
								!completedLectures.includes(subSectionId) && (
									<IconBtn disabled={loading} onclick={() => handleLectureCompletion()} text={!loading ? "Mark As Completed" : "Loading..."} customClasses={"text-lg"}/>
								)
							}

							<IconBtn disabled={loading} onclick={() => {
								if(playerRef?.current) {
									playerRef?.current?.seek(0);
									setVideoEnded(false);
								}
							}} text={"Rewatch"} customClasses={"text-base"}/>

							<div className='flex items-center gap-3 mt-2'>
								{
									!isFirstVideo() && (
										<button disabled={loading} onClick={goToPrevVideo} className='blackButton flex items-center gap-2 text-lg tracking-wide'><AiOutlineLeft className='sm:text-lg'/> Previous</button>
									)
								}

								{
									!isLastVideo() && (
										<button disabled={loading} onClick={goToNextVideo} className='blackButton flex items-center gap-2 text-lg tracking-wide'>Next <AiOutlineRight/></button>
									)
								}
							</div>
						</div>
					}
				</Player>
			}
			<p className='text-4xl text-richblack-5 mt-5 font-bold'>{videoData?.title}</p>
			<p className='mt-3 tracking-wide text-richblack-300'>{videoData?.description}</p>
		</div>
	)
}

export default VideoDetails