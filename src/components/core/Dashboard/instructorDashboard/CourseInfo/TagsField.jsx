import React from 'react'

const TagsField = () => {

  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleInputkeyDown = () => {
    if(e.key === 'Enter' || e.key === ','){
      e.preventDefault();

      if(setInputValue.trim()){
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
            <span>
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