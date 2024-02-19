import React from 'react'
import { useState } from 'react';

const TagsField = () => {

  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState([]);

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

  const removeTag = (tagRemove) => [
    setTags(tags.filter(tag => tag !== tagRemove))
  ]

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
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputkeyDown}
        placeholder='Type tags here...'
      />
    </div>
  )
}

export default TagsField