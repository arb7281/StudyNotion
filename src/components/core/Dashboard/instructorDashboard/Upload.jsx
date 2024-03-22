import React, { useEffect, useRef, useState } from 'react';
import { FiUploadCloud } from "react-icons/fi"
import { useSelector } from 'react-redux';

const Upload = ({
    name,
    label,
    register,
    setValue,
    errors,
    setError,
    video = false,
    viewData = null,
    editData = null
  }) => {
  const [preview, setPreview] = useState(null);
  const [fileType, setFileType] = useState(null)
  const {course, editCourse} = useSelector((state) => state.course)
  const fileInputRef = useRef(null)

  console.log("printing video in Upload.jsx", video)
  console.log("printing viewData", viewData)

  useEffect(() => {
    register(name, {required: true})
    if(editCourse || viewData || editData){
      
      !video ? setPreview(course.thumbnail) : (viewData ? setPreview(viewData) : (editData && setPreview(editData)))
     
    }else{
      console.log("I am directly into else case")
    }
    
    
  }, [editCourse, viewData, editData])

  const handleFileChange = (file) => {
    // e.preventDefault();
    // const file = e.dataTransfer.files[0];

    if(!file) return
    console.log("video file received")
      const reader = new FileReader(); //this we use when we need to work with file types
      //reader.onLoad is actualy an asynchronous method which only called after the file reading process is completed
      //and here file reading is getting done by reader.readAsDataURL this method once it completed the 
      //onload method will be triggered
      
      reader.onload = () => {// this is the second step executed 
        setPreview(reader.result);
        setFileType(file.type);

        console.log("printing file type", fileType);

        if (
          (video && file.type.startsWith("video/")) ||
          (!video && file.type.startsWith("image/"))
        ) {
          setValue(name, file); // Set value for form submission
          // setError(name, {message: null})
          errors[name] = null
          console.log("file value set and this is file", file)
        } else {
          // Clear the preview, file type, and form value if the dropped file is not of the allowed type
          setPreview(null);
          setFileType(null);
          setValue(name, null);
          setError(name, { message: video ? 'Please upload a video file' : 'Please upload an image file' })
        }
        
      }
    reader.readAsDataURL(file);// this is the step fist executed
  };

  const handleDropOrFileInput = (e) => {
    e.preventDefault();
    const file = e.type === "drop" ? e.dataTransfer.files[0] : e.target.files[0]
    handleFileChange(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDivClick = () => {
    fileInputRef.current.click()
  }

  return (
    <div>
      <div
        className='flex flex-col space-y-2'
        onClick={handleDivClick}
        onDrop={handleDropOrFileInput}
        onDragOver={handleDragOver}
      >
        <label className='text-sm text-richblack-5' htmlFor={name}>{label} {!viewData && <sup className='text-pink-200'>*</sup>}</label>
        <div className='flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500'>       
        { preview ? (
          <div className='flex w-full items-center flex-col p-6'>
            {!video ? (
              <img
                src={preview}
                alt="Preview"
                
                className='h-full w-full rounded-md object-cover max-w-[200px] max-h-[200px]'
              />
            ) : (
              <video
                src={preview}
                controls
                
                className='h-full w-full rounded-md object-cover max-w-[500px] max-h-[500px]'
              />
            )}
            {!viewData && preview ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setPreview(null);
                  setValue(name, null);
                }}
                className='mt-3 text-white underline'
              >
                Cancel
              </button>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center p-6">
            <input
              type="file"
              style={{ display: "none" }}
              onChange={handleDropOrFileInput}
              ref={fileInputRef}
            />
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop an {!video ? "image" : "video"}, or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span> a
              file
            </p>
            {video ? (
              <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
                <li>Aspect ratio 16:9</li>
                <li>Recommended size 1024x576</li>
              </ul>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {errors[name].message ? errors[name].message : label + " is required"}
        </span>
      )}
      </div>
    </div>
  );
};

export default Upload;