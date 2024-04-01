import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { categoryPageDetails } from '../services/operations/courseDetailsAPI';

const Catalog = () => {

    const {categoryId} = useParams()
    const [catalogPageData, setCatalogPageData] = useState(null);
    
    useEffect(() => {
        const getCategoryDetails = async () =>{
            try{
                const result = await categoryPageDetails(categoryId)

                if(result.data.success){
                    setCatalogPageData(result)
                }
            }catch(error){
                console.log(error)
            }

            if(categoryId){
                getCategoryDetails()
            }
        }
    }, [categoryId])

  return (
    <div className='text-white'>
    <div>
        <p>
            {
                `Home / Catalog /`
            }
            <span>
                {catalogPageData?.data?.selectedCategory?.name}
            </span>
        </p>
        <p>{catalogPageData?.data?.selectedCategory?.name}</p>
        <p>{catalogPageData?.data?.selectedCategory?.description}</p>
    </div>
    </div>
  )
}

export default Catalog