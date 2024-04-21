import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


const RequirementField = ({name, label, register, setValue, getValues, errors}) => {

    const [inputText, setInputText] = useState()
    const [requirement, setRequirement] = useState([])

    const { editCourse, course } = useSelector((state) => state.course)

    useEffect(() => {

      if (editCourse) {
        // console.log(course)
        const insArray = JSON.parse(course?.instructions)
      // setTags(tagsArray)
        setRequirement(insArray)
      }
        register(name, {required: true})
        
    },[register, name])

    useEffect(() => {
        setValue(name, requirement)
    },[requirement])

    const handleInputChange = (e) =>{
        setInputText(e.target.value)
    }

    const handleAddRequirement = () => {
        if(inputText.trim() !== ''){
            setRequirement([...requirement, inputText])
            setInputText('')
        }    
    }

    const handleRemoveRequirement = (index) => {
        //In JavaScript, when you're using array functions like filter, 
        //sometimes you're not interested in using the value of the element itself. 
        //In such cases, you can use an underscore _ as a convention to indicate that 
        //the value is intentionally unused or ignored.
        const updateRequirement = requirement.filter((_, i) => i !== index)
        setRequirement(updateRequirement)
    }


  return (
    <div className="flex flex-col space-y-2">
    <label className="text-sm text-richblack-5" htmlFor={name}>{label}<sup className="text-pink-200">*</sup></label>
      <div className="flex flex-col items-start space-y-2">
        <input type="text" value={inputText} onChange={handleInputChange} id={name}
        className="form-style w-full"
        />
        <button type="button" onClick={handleAddRequirement} className="font-semibold text-yellow-50">+ add</button>
      </div>
      

      


      {requirement.length > 0 && (
        <ul className="mt-2 list-inside list-disc">
          {requirement.map((item, index) => 
          (
            <li key={index} className="flex items-center text-richblack-5">
              <span>{item}</span>
              <button className="ml-2 text-xs text-pure-greys-300 " type="button" onClick={() => handleRemoveRequirement(index)}>Remove</button>
            </li>
          )
            
          )}
        </ul>
      )}

      {errors[name] && requirement.length === 0 && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
                {label} is required**
            </span>
      )}
      
    </div>
  );
}

export default RequirementField