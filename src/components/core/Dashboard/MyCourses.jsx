import React, { useState, useEffect } from 'react'
import CTAButton from '../Homepage/CTAButton'
import { VscAdd } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI'
import CoursesTable from './InstructorCourses/CoursesTable'

const MyCourses = () => {

  const [courses, setCourses] = useState([])
  const navigate = useNavigate()
  const {token} = useSelector((state) => state.auth)

  useEffect(() => {
    const fetchCourses = async () => {
      console.log("printing token inside MyCourses", token)
      const result = await fetchInstructorCourses(token)
      if(result){
        setCourses(result)
      }
    }
    fetchCourses()
  },[])

  return (
    <div>
      <div>
        <h1>
          My Courses
        </h1>
        <CTAButton
          linkto={"/dashboard/add-course"}
          active={true}
          
        >
          <VscAdd/>
        </CTAButton>
      </div>
      {courses && <CoursesTable courses={courses} setCourses={setCourses}/>}
    </div>
  )
}

export default MyCourses