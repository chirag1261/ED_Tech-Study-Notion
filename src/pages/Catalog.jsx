import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { categories } from '../services/api';
import { apiConnector } from '../services/apiConnector'
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import CourseCardCatalog from '../components/core/Catalog/CourseCardCatalog';
import Loader from '../components/common/Loader'
import Error from '../pages/Error'

function Catalog() {
    const {name} = useParams();
    const [loading, setLoading] = useState(false);
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [cat, setCat] = useState('Most Popular');

    useEffect(() => {
        const getCategories = async() => {
            const res = await apiConnector("GET", categories.CATEGORIES_API)
            const category_id = res?.data?.allCategories?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === name)[0]._id
            setCategoryId(category_id);
        }

        setLoading(true);
        getCategories();
    }, [name]);

    useEffect(() => {
        
        async function getCategoryDetails() {
            setLoading(true);
            try {
                const res = await getCatalogPageData(categoryId);
                setCatalogPageData(res);
            }
            catch(error) {
                console.log(error);
            }
            setLoading(false);
        }
        
        if(categoryId) {
            getCategoryDetails();
        }
    }, [categoryId]);

    if(catalogPageData?.length === 0) {
        return (<Error/>)
    }

    return (
        <>
            {
                loading && <div className='min-h-[90vh] flex items-center justify-center'><Loader/></div>
            }

            {
                catalogPageData && catalogPageData?.data &&
                <div className='text-richblack-5 '>
                    <div className='bg-richblack-800 py-[5rem]'>
                        <div className='max-w-maxContent mx-auto flex flex-col gap-4 px-3'>
                            <p className='text-richblack-300 text-sm tracking-wide'>Name / Catalog / <span className='text-yellow-25'>{catalogPageData?.data?.selectedCategory?.name}</span></p>
                            <p className='text-3xl text-richblack-5'>{catalogPageData?.data?.selectedCategory?.name}</p>
                            <p className='text-richblack-300 tracking-wide'>{catalogPageData?.data?.selectedCategory?.description}</p>
                        </div>
                    </div>

                    <div className='mt-10 max-w-maxContent mx-auto px-3'>
                        {/* Section 1 */}
                        <div>
                            <p className='text-4xl font-semibold mt-10 tracking-wide'>Courses to get you started</p>
                            <div className='flex gap-3 mt-5 text-[15px] border-b border-richblack-300 text-richblack-100'>
                                <p className={`${cat === 'Most Popular' ? 'text-yellow-25 border-b border-yellow-25' : ''} px-3 pb-2 cursor-pointer`} onClick={() => setCat('Most Popular')}>Most Popular</p>
                                <p className={`${cat === 'New' ? 'text-yellow-25 border-b border-yellow-25' : ''} px-3 pb-2 cursor-pointer`} onClick={() => setCat('New')}>New</p>
                            </div>

                            <div className='mt-7'>
                                <CourseSlider courses={catalogPageData?.data?.selectedCategory?.courses}/>
                            </div>
                        </div>

                        {/* Section - 2 */}
                        <div className='my-28'>
                            <p className='text-4xl font-semibold'>Top Courses in {catalogPageData?.data?.differentCategory?.name}</p>
                            <div className='mt-7'>
                                <CourseSlider courses={catalogPageData?.data?.differentCategory?.courses}/>
                            </div>
                        </div>

                        {/* Section - 3 */}
                        <div>
                            <p className='text-4xl font-semibold'>Frequently Bought</p>
                            <div className='py-7 pb-24'>
                                <div className='grid grid-cols-1 lg:grid-cols-2 gap-7'>
                                    {
                                        catalogPageData?.data?.mostSellingCourses?.slice(0, 4).map((course, index) => (
                                            <CourseCardCatalog course={course} key={index} height={"h-[400px]"}/>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <Footer/>
                </div>
            }
        </>
    )
}

export default Catalog