import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteSection, deleteSubSection  } from '../../../../../services/operations/courseDetailsAPI'
import { setCourse } from '../../../../../slices/courseSlice'
import { BiDownArrow } from 'react-icons/bi'
import {MdEdit} from "react-icons/md"
import {RiDeleteBin6Line} from "react-icons/ri"
import {RxDropdownMenu} from "react-icons/rx"
import {AiOutlinePlus} from "react-icons/ai"
import ConfirmationModal from './ConfirmationModal'
import SubSectionModal from './SubSectionModal'

const NestedView = ({handleChangeEditSectionName}) => {

    const {course} = useSelector((state) => state.course)
    console.log("printing updated course inside nesteview", course)
    const [confirmationModal, setConfirmationModal] = useState(null)
    const {token} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [viewSubSection, setViewSubSection] = useState(null)
    const [editSubSection, setEditSubSection] = useState(null)
    const [addSubSection, setAddSubSection] = useState(null)


    //delete section handler
    const handleDeleteSection = async (sectionId) => {
        const result = await deleteSection({
            sectionId,
            courseId: course._id
        }, token)

        if(result){
            dispatch(setCourse(result))
        }
        setConfirmationModal(null)
    }

    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubSection({
            subSectionId,
            sectionId,
            courseId: course._id
        }, token)

        if(result){
            dispatch(setCourse(result))
        }
        setConfirmationModal(null)
    }




  return (
    <div>
        <div className='rounded-lg bg-richblack-700 p-6 px-8'>
            {
                course?.courseContent?.map((section) => (
                    <details key={section._id} open>
                    {/* this summary will hold the the section name only */}
                        <summary className='flex items-center justify-between gap-x-3 border-b-2'>
                            <div className='flex items-center gap-x-3'>
                                <RxDropdownMenu/>
                                <p>{section.sectionName}</p>
                            </div>
                            <div className='flex items-center gap-x-3'>
                                <button
                                onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}
                                >
                                {/* that pencil icon */}
                                    <MdEdit/>
                                </button>

                                <button
                                onClick ={
                                    () => {
                                    setConfirmationModal({
                                        text1: "Delete this Section?",
                                        text2: "All the lectures in this section will be deleted",
                                        btn1Text: "Delete",
                                        btn2Text: "Cancel",
                                        btn1Handler: () => handleDeleteSection(section._id),
                                        btn2Handler: () => setConfirmationModal(null)
                                    })
                                    }
                                } 
                                >
                                {/* that delete icon */}
                                    <RiDeleteBin6Line className="text-xl text-richblack-300"/>
                                </button>
                                <span className="font-medium text-richblack-300">|</span>
                                <BiDownArrow className={`text-xl text-richblack-300`}/>
                            </div>
                        </summary>

                                {/* this div is holding subsection content it will be revealed only if the summary is clicked */}
                        <div className="px-6 pb-4">
                            {
                                section?.subSection?.map((data) => (
                                    <div
                                    key={data?._id}
                                    
                                    className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                                    >
                                        <div 
                                        onClick={() => setViewSubSection(data)}
                                        className='flex items-center gap-x-3 cursor-pointer'>
                                        {/* menu icon */}
                                            <RxDropdownMenu/>
                                            <p className="font-semibold text-richblack-50">{data.title}</p>
                                        </div>
                                        <div className='flex items-center gap-x-3'>
                                            <button
                                            onClick={(e) => setEditSubSection({...data, sectionId:section._id})}
                                            >
                                            {/* edit icon */}
                                                <MdEdit className="text-xl text-richblack-300"/>
                                            </button>

                                            {/* on clickin on this button confirmation modal will open */}
                                            <button
                                            onClick={() => setConfirmationModal({
                                                text1: "Delete this SubSection",
                                                text2: "Selected Lecture will be deleted",
                                                btn1Text: "Delete",
                                                btn2Text: "Cancel",
                                                btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                                btn2Handler: () => setConfirmationModal(null)
                                            })}
                                            >

                                            {/* delete button */}
                                                <RiDeleteBin6Line className="text-xl text-richblack-300"/>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                            <button
                            onClick={() => setAddSubSection(section._id)}
                            className='mt-4 flex items-center gap-x-2 text-yellow-50'
                            >
                           {/*  add icon */}
                                <AiOutlinePlus className="text-lg"/>
                                <p>Add Lecture</p>
                            </button>
                        </div>
                    </details>
                ))
            }
        </div>


{/* implement this logic using modal module */}
        {
            addSubSection ? (
                <SubSectionModal
                    modalData={addSubSection}
                    setModalData={setAddSubSection}
                    add={true}
                />
            )
            :viewSubSection ? (
                <SubSectionModal
                    modalData={viewSubSection}
                    setModalData={setViewSubSection}
                    view={true}
                />
            )
            :editSubSection ? (
                <SubSectionModal
                    modalData={editSubSection}
                    setModalData={setEditSubSection}
                    edit={true}
                />
            ):(<div></div>)
        }
        {
            confirmationModal ?
            (
                <ConfirmationModal modalData={confirmationModal} setConfirmationModal = {setConfirmationModal}/>
            )
            :(<div></div>)
        }
    </div>
  )
}

export default NestedView