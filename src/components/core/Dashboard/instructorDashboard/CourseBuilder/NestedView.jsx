import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteSection, deleteSubSection  } from '../../../../../services/operations/courseDetailsAPI'
import { setCourse } from '../../../../../slices/courseSlice'
import { BiDownArrow } from 'react-icons/bi'
import {MdEdit} from "react-icons/md"
import {RiDeleteBin6Line} from "react-icons/ri"
import {BiDownArrow} from "react-icons/bi"
import {AiOutlinePlus} from "react-icons/ai"

const NestedView = ({handleChangeEditSectionName}) => {

    const {course} = useSelector((state) => state.course)
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
                                        text1: "Delete this Section",
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
                                    <RiDeleteBin6Line/>
                                </button>
                                <span>|</span>
                                <BiDownArrow className={`text-xl text-richblack-300`}/>
                            </div>
                        </summary>

                        <div>
                            {
                                section?.subSection?.map((data) => (
                                    <div
                                    key={data?._id}
                                    onClick={() => setViewSubSection(data)}
                                    className='flex item-center justify-between gap-x-3 border-b-2'
                                    >
                                        <div className='flex items-center gap-x-3'>
                                        {/* menu icon */}
                                            <RxDropdownMenu/>
                                            <p>{data.title}</p>
                                        </div>
                                        <div className='flex items-center gap-x-3'>
                                            <button
                                            onClick={() => setEditSubSection({...data, sectionId:section._id})}
                                            >
                                            {/* edit icon */}
                                                <MdEdit/>
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
                                                <RiDeleteBin6Line/>
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
                                <AiOutlinePlus/>
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
                <confirmationModal modalData={confirmationModal}/>
            )
            :(<div></div>)
        }
    </div>
  )
}

export default NestedView