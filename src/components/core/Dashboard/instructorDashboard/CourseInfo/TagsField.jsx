import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const TagsField = ({name, label, register, setValue, getValues, errors}) => {

  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState([]);

  const { editCourse, course } = useSelector((state) => state.course)

  useEffect(() => {
    if (editCourse) {
      // console.log(course)
      const tagsArray = JSON.parse(course.tag)
      setTags(tagsArray)
    }
    register(name, {required: true, validate: (value) => value.length > 0 })
    
  },[register, name])

  useEffect(() => {
      setValue(name, tags)
  },[tags])

  const handleInputChange = (e) => {
    // console.log("I am inside handleInputChange")
    setInputValue(e.target.value)
    // console.log("printing inputValue", inputValue)
  }

  const handleInputkeyDown = (e) => {
    if(e.key === 'Enter' || e.key === ','){
      console.log("I am inside handleInputkeyDown after pressing Enter and ,")
      e.preventDefault();

      if(inputValue.trim()){
        setTags([...tags, inputValue.trim()]);
        setInputValue('')
      }
    }
  }

  const removeTag = (tagRemove) => {
    setTags(tags.filter(tag => tag !== tagRemove))
  }

  return (
    <div>
      <div>
        {
          tags.map((tag, index) => (
            <span key={index}>
              {tag}
              <button onClick={() => removeTag(tag)}>Remove</button>
            </span>
          ))
        }
      </div>
      <label htmlFor={name}>{label}<sup>*</sup></label>
      <input
        type='text'
        id={name}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputkeyDown}
        placeholder='Type tags here...'
      />
      {errors[name] && tags.length === 0 && (
            <span>
                {label} is required**
            </span>
        )}
    </div>
  )
}

export default TagsField