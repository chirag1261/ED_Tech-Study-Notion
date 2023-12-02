import React, { useEffect, useState } from 'react'
import IconBtn from '../components/common/IconBtn'
import { useDispatch, useSelector } from 'react-redux';
import { buyCourse } from '../services/operations/StudentFeatureAPI';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/common/Footer'
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import { toast } from 'react-hot-toast';
import Loader from '../components/common/Loader'
import RatingStars from '../components/common/RatingStars'
import { RiInformationLine } from 'react-icons/ri';
import { MdOutlineLanguage } from 'react-icons/md';
import { formatDate } from '../services/formatDate'
import { TiChevronRight } from 'react-icons/ti';
import { FaShareSquare } from 'react-icons/fa';
import CourseContent from '../components/core/CourseDetails/CourseContent';
import { addToCart } from '../slices/cartSlice';
import GetAvgRating from '../utils/avgRating';
import ConfirmationModal from '../components/common/ConfirmationModal'
import { ACCOUNT_TYPE } from '../utils/constants'

function CourseDetails() {
    const {token} = useSelector((state) => state.auth);
    const {courseId} = useParams();
    const {user} = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
       
    const [loading, setLoading] = useState(true);
    const [course, setCourse] = useState('');
    const [avgReviewCount, setAverageReviewCount] = useState(0);
    const [confirmationModal, setConfirmartionModal] = useState(null);

    function handleBuyCourse() {
        if(token) {
            user && course?.studentEnrolled.includes(user?._id) ? navigate("/dashboard/enrolled-courses") : 
            buyCourse([courseId], token, user, navigate, dispatch);
            return;
        }

        setConfirmartionModal({
            text1: "You are not logged in",
            text2: "Please login to purchase the course.",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmartionModal(null),
        })
    }

    function addToCartHandle() {
        if(!token) {
            setConfirmartionModal({
                text1: "You are not logged in",
                text2: "Please login to purchase the course.",
                btn1Text: "Login",
                btn2Text: "Cancel",
                btn1Handler: () => navigate("/login"),
                btn2Handler: () => setConfirmartionModal(null),
            })
        }
        else {
            // toast.success("You can buy");
            if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
                toast.error("You are an instructor, you can't buy a course");
                return;
            }
            
            dispatch(addToCart(course));
        }
    }

    async function getCourseDetails() {
        setLoading(true);
        try {
            const result = await fetchCourseDetails(courseId);
            setCourse(result);
            // console.log(result);
        }
        catch(error) {
            toast.error("Cannot fetch details of the course");
        }

        setLoading(false);
    }

    useEffect(() => {
        getCourseDetails()
    }, [courseId])

    useEffect(() => {
        const count = GetAvgRating(course?.ratingAndReviews);
        setAverageReviewCount(count);
    }, [course]);

    return (
        <>
            {
                loading ? <div className='min-h-[90vh] flex items-center justify-center'><Loader/></div> :
                course &&
                <div>
                    <div className='bg-richblack-800 pl-3'>
                        {/* This div will only visible on larger screens */}
                        <div className='max-w-maxContent mx-auto lg:py-28 items-center relative lg:block hidden'>
                            
                            <div className='flex flex-col gap-4'>
                                <p className='text-5xl font-semibold text-richblack-5'>{course?.courseName}</p>
                                <p className='text-richblack-300 text-lg tracking-wide'>{course?.courseDescription}</p>
                                <div className='text-lg flex gap-3'>
                                    <p className='text-yellow-25'>{avgReviewCount}</p>
                                    <RatingStars Review_Count={avgReviewCount} Star_Size={24}/>
                                    <p className='text-richblack-5 tracking-wide'><span>{course?.ratingAndReviews?.length || 0}</span> Reviews</p>
                                    <p className='text-richblack-5 tracking-wide'><span>{course?.studentEnrolled?.length || 0}</span> students enrolled</p>
                                </div>
                                <p className='text-richblack-5 text-lg tracking-wide'>Created By {course?.instructor?.firstName} {" "} {course?.instructor?.lastName}</p>
                                <div className='text-richblack-5 text-lg flex gap-4 items-center tracking-wide' >
                                    <div className='flex gap-3 items-center'>
                                        <RiInformationLine />
                                        <p>Created at {formatDate(course?.createdAt)}</p>  
                                    </div>

                                    <div className='flex gap-3 items-center'>
                                        <MdOutlineLanguage/>
                                        <p>English</p>
                                    </div>
                                </div>
                            </div>

                            <div className='lg:max-w-[400px] bg-richblack-700 rounded-lg p-5 lg:absolute lg:top-12 lg:right-5 flex flex-col items-center'>
                                <div className='flex flex-col gap-4 items-center justify-center'>
                                    <img src={course?.thumbnail?.url} alt='Course Thumbnail' className='max-h-[320px] rounded-lg'/>
                                    
                                    <p className='text-3xl text-richblack-5 font-semibold w-full'>Rs. {course?.price}</p>
                                    
                                    <IconBtn text={user && course?.studentEnrolled.includes(user?._id) ? "Go to Course" : "Buy Now"} customClasses={'w-full flex items-center justify-center'} onclick={handleBuyCourse} type={'button'}/>
                                    
                                    {
                                        !course?.studentEnrolled?.includes(user?._id) && (
                                        <button className='bg-richblack-800 text-richblack-5 font-semibold w-full py-2 rounded-lg' onClick={addToCartHandle}>Add to Cart</button>)
                                    }
                                    
                                    <p className='text-richblack-100 tracking-wide text-sm'>30-Day Money-Back Guarantee</p>
                                </div>


                                <div className='mt-5 place-self-start'>
                                    <p className='text-xl font-semibold text-richblack-5 tracking-wide'>This Course Includes :</p>
                                    {
                                        course?.instructions?.map((i, index) => (
                                            <div key={index} className='items-center flex gap-3 text-caribbeangreen-300 ml-2 mt-2'>
                                                <TiChevronRight/>
                                                <p className='font-semibold'>{i}</p>
                                            </div>
                                        ))
                                    }
                                </div>

                                <p className='text-yellow-100 flex items-center gap-3 my-5 cursor-pointer w-fit' onClick={() => {
                                    navigator.clipboard.writeText(window.location.href); toast.success("Copied to Clipboard")
                                }}>
                                    <FaShareSquare/> Share
                                </p>
                            </div>
                        </div>

                        {/* This div will appear on smaller screen which is lesser than larger screens */}
                        <div className='px-3 flex flex-col gap-4 items-center justify-center lg:hidden py-10 relative'>
                            <p className='sm:text-5xl text-4xl font-semibold text-richblack-5 text-center'>{course?.courseName}</p>
                            
                            <div>
                                <img src={course?.thumbnail?.url} alt='Course Thumbnail' className='w-[500px] rounded-lg'/>
                                {/* <div className='border border-white bg-richblack-800 h-10 absolute w-[500px] bottom-52'></div> */}
                            </div>
                            
                            <p className='text-richblack-300 text-lg tracking-wide'>{course?.courseDescription}</p>
                            
                            <div className='text-lg flex gap-3 min-[500px]:flex-row flex-col items-center justify-center'>
                                <div className='flex gap-3 items-center'>
                                    <p className='text-yellow-25'>{avgReviewCount}</p>
                                    <RatingStars Review_Count={avgReviewCount} Star_Size={24}/>
                                </div>

                                <div className='flex gap-3 items-center'>
                                    <p className='text-richblack-5 tracking-wide'><span>{course?.ratingAndReviews?.length || 0}</span> Reviews</p>
                                    <p className='text-richblack-5 tracking-wide'><span>{course?.studentEnrolled?.length || 0}</span> students enrolled</p>
                                </div>
                            </div>
                            
                            <p className='text-richblack-5 text-lg tracking-wide'>Created By {course?.instructor?.firstName} {" "} {course?.instructor?.lastName}</p>
                            
                            <div className='text-richblack-5 text-lg flex gap-4 items-center tracking-wide min-[500px]:flex-row flex-col' >
                                <div className='flex gap-3 items-center'>
                                    <RiInformationLine />
                                    <p>Created at {formatDate(course?.createdAt)}</p>  
                                </div>

                                <div className='flex gap-3 items-center'>
                                    <MdOutlineLanguage/>
                                    <p>English</p>
                                </div>
                            </div>

                            <div className='sm:w-[500px] w-full h-[1px] bg-richblack-500'></div>
                            <div className='flex items-center justify-between sm:w-[500px] w-full'>
                                <p className='text-3xl text-richblack-5 font-semibold'>Rs. {course?.price}</p>
                                <p className='text-yellow-100 flex items-center gap-3 my-5 cursor-pointer w-fit' onClick={() => {
                                    navigator.clipboard.writeText(window.location.href); toast.success("Copied to Clipboard")
                                }}>
                                    <FaShareSquare/> Share
                                </p>
                            </div>
                                    
                            <IconBtn text={user && course?.studentEnrolled.includes(user?._id) ? "Go to Course" : "Buy Now"} customClasses={'flex items-center justify-center sm:w-[500px] w-full'} onclick={handleBuyCourse} type={'button'}/>
                            
                            {
                                !course?.studentEnrolled?.includes(user?._id) && (
                                <button className='lg:bg-richblack-800 bg-richblack-700 sm:w-[500px] w-full text-richblack-5 font-semibold py-2 rounded-lg' onClick={addToCartHandle}>Add to Cart</button>)
                            }
                        </div>
                    </div>
                    
                    <div className='max-w-maxContent mx-auto mt-10 text-richblack-5 pl-3 lg:pr-0 pr-3'>
                        <div className='border border-richblack-500 lg:w-[55%] p-10'>
                            <p className='text-3xl font-semibold'>What you'll Learn</p>
                            <p className='mt-4'>{course?.whatYouWillLearn}</p>
                        </div>

                        <div className='text-richblack-5 my-10 lg:w-[55%]'>
                            <p className='text-3xl font-semibold'>Course Content</p>
                            <div>
                                <CourseContent courseContent={course?.courseContent}/>
                            </div>
                        </div>
                        
                        <div className='my-10'>
                            <p className='text-3xl font-semibold'>Author</p>
                            <div className='mt-3 flex gap-4 items-center'>
                                <img src={course?.instructor?.image?.image_url} alt='' className='rounded-full w-[50px] h-[50px]'/>
                                <p className='text-lg'>{course?.instructor?.firstName} {" "} {course?.instructor?.lastName}</p>
                                <p>{course?.instructor?.additionalDetails?.about}</p>
                            </div>
                        </div>
                    </div>

                    {
                        confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
                    }

                    <Footer/>
                </div>
            }
        </>
    )
}

export default CourseDetails