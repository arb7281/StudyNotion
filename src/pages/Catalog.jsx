import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
// import { categoryPageDetails } from '../services/operations/courseDetailsAPI';
import { categoryPageDetails } from '../services/operations/courseDetailsAPI';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import Course_Card from '../components/core/Catalog/Course_Card';

const Catalog = () => {

    const {categoryId} = useParams()
    const [catalogPageData, setCatalogPageData] = useState(null);
    
    useEffect(() => {
        console.log("printing CategoryID", categoryId)
        const getCategoryDetails = async () =>{
            try{
                console.log("inside of try block")
                const result = await categoryPageDetails(categoryId)
                console.log("Printing result", result)
                if(result){
                    setCatalogPageData(result)
                    console.log("printing catalogPageData", catalogPageData)
                }
            }catch(error){
                console.log(error)
            }
        }
        getCategoryDetails()

    }, [categoryId])

  return (
    <div className='text-white'>
    <div>
        <p>
            {
                `Home / Catalog /`
            }
            <span>
                {catalogPageData?.selectedCategory?.name}
            </span>
        </p>
        <p>{catalogPageData?.selectedCategory?.name}</p>
        <p>{catalogPageData?.selectedCategory?.description}</p>
    </div>

    <div>
            {/* section1 */}
            <div>
            <div>Courses to get you started</div>
                <div className=' flex gap-x-3'>
                    <p>Most Popular</p>
                    <p>New</p>
                </div>
                <div>
                    <CourseSlider Courses={catalogPageData?.selectedCategory?.courses} />
                </div>
            </div>  

            {/* section2 */}
            <div>
            <div>Top Courses in {catalogPageData?.selectedCategory?.name}</div>
                <div>
                    <CourseSlider Courses={catalogPageData?.differentCategory?.courses}/>
                </div>
            </div>

            {/* section3 */}
            <div>
                <div>Frequently Bought</div>
                <div className='py-8'>

                    <div className='grid grid-cols-1 lg:grid-cols-2'>

                        {
                            catalogPageData?.mostSellingCourses?.slice(0,4)
                            .map((course, index) => (
                                <Course_Card course={course} key={index} Height={"h-[400px]"}/>
                            ))
                        }

                    </div>

                </div>
            </div>

        </div>
    </div>
  )
}

export default Catalog