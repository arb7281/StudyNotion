import React, { useState, useEffect } from 'react'
import CTAButton from '../Homepage/CTAButton'
import { VscAdd } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { deleteCourse, fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI'
import CoursesTable from './InstructorCourses/CoursesTable'
import { FiDelete } from 'react-icons/fi'
import ConfirmationModal from './instructorDashboard/CourseBuilder/ConfirmationModal'
import {RiDeleteBin6Line} from 'react-icons/ri'
// import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI'


const MyCourses = () => {

  const [courses, setCourses] = useState([])
  const navigate = useNavigate()
  const {token} = useSelector((state) => state.auth)
  const [selectedIds, setSelectedIds] = useState([]);
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [loading, setLoading] = useState(null)

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

  const deleteCourses = async (selectedIds, token) => {
    if(selectedIds.length === 0){
      return 
    }

    try{
      setLoading(true)
      console.log("printing selectedIds", selectedIds)
      const deletionPromises = selectedIds.map((courseId) => deleteCourse({courseId: courseId}, token))
      await Promise.all(deletionPromises)
      const result = await fetchInstructorCourses(token)

        if(result){
            setCourses(result)
        }
      setConfirmationModal(null)
      setLoading(false)
    }catch(error){
      console.log("Error deleting courses:", error)
      setLoading(false)
    }
    
  }


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
        <button
                    disabled={loading}
                    onClick={() => {
                      if (selectedIds.length > 0) {
                        setConfirmationModal({
                          text1: "Do you want to delete all courses?",
                          text2:
                            "All the data related to these courses will be deleted",
                          btn1Text: !loading ? "Delete" : "Loading...",
                          btn2Text: "Cancel",
                          btn1Handler: !loading
                            ? () => deleteCourses(selectedIds, token)
                            : () => {},
                          btn2Handler: !loading
                            ? () => setConfirmationModal(null)
                            : () => {},
                        });
                      }
                    }}
                    title="Delete"
                    className="px-1 flex items-center gap-2 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    Delete Selected Courses
                    <RiDeleteBin6Line size={20} />
          </button>
      </div>
      {courses && <CoursesTable courses={courses} setCourses={setCourses} selectedIds={selectedIds} setSelectedIds={setSelectedIds}/>}
      {confirmationModal &&  selectedIds.length > 0 &&(
        <ConfirmationModal
          modalData={confirmationModal}
          setConfirmationModal={setConfirmationModal}
        />
      )}
    </div>
  )
}

export default MyCourses