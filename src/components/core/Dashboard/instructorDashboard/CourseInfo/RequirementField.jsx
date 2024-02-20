import React, { useEffect, useState } from 'react'


const RequirementField = ({name, label, register, setValue, getValues, errors}) => {

    const [inputText, setInputText] = useState()
    const [requirement, setRequirement] = useState([])

    useEffect(() => {
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
    <div>
    <label htmlFor={name}>{label}<sup>*</sup></label>
      <input type="text" value={inputText} onChange={handleInputChange} id={name}
      />
      <button type="button" onClick={handleAddRequirement}>+ add</button>

      


      {requirement.length > 0 && (
        <ul>
          {requirement.map((item, index) => 
          (
            <li key={index}>
              {item}
              <button type="button" onClick={() => handleRemoveRequirement(index)}>Remove</button>
            </li>
          )
            
          )}
        </ul>
      )}

      {errors[name] && requirement.length === 0 && (
            <span>
                {label} is required**
            </span>
      )}
      
    </div>
  );
}

export default RequirementField