import React from 'react'
import { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
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
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      <div className="flex w-full flex-wrap gap-y-2">
        {
          tags.map((tag, index) => (
            <span className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5" key={index}>
              {tag}
              <button className="ml-2 focus:outline-none" onClick={() => removeTag(tag)}><MdClose className="text-sm"/></button>
              
            </span>
          ))
        }
      </div>
      {/* <label htmlFor={name}>{label}<sup>*</sup></label> */}
      <input
        type='text'
        id={name}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputkeyDown}
        placeholder='Type tags here...'
        className="form-style w-full"
      />
      {errors[name] && tags.length === 0 && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
                {label} is required**
            </span>
        )}
    </div>
  )
}

export default TagsField