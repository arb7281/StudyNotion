import React, { useEffect, useState } from 'react';
import { FiUploadCloud } from "react-icons/fi"

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

  useEffect(() => {
    register(name, {required: true})
  }, [register])

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if(!file) return
    
      const reader = new FileReader();
      //reader.onLoad is actualy an asynchronous method which only called after the file reading process is completed
      //and here file reading is getting done by reader.readAsDataURL this method once it completed the 
      //onload method will be triggered
      
      reader.onload = () => {
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
          console.log("file value set ")
        } else {
          // Clear the preview, file type, and form value if the dropped file is not of the allowed type
          setPreview(null);
          setFileType(null);
          setValue(name, null);
          setError(name, { message: video ? 'Please upload a video file' : 'Please upload an image file' })
        }
        
      }
    reader.readAsDataURL(file);
  };

  // useEffect(() => {
  //   if (fileType) {
  //     if ((video && fileType.startsWith('video/')) || (!video && fileType.startsWith('image/'))) {
  //       setError(name, false); // Clear error message
  //     } else {
  //       setError(name, { message: video ? 'Please upload a video file' : 'Please upload an image file' });
  //     }
  //   }
  // }, [fileType, setError, name, video])

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div
        
        style={{
          width: "300px",
          height: "300px",
          border: "2px dashed #aaa",
          borderRadius: "5px",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          cursor: "pointer",
        }}
      >
        <label>{label}</label>
        {preview ? (
          fileType.startsWith("image/") ? (
            <img
              src={preview}
              alt="Preview"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          ) : (
            <video
              src={preview}
              controls
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          )
        ) : (
          
          <div
            className="flex w-full flex-col items-center p-6"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {/* <input /> */}
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop an {!video ? "image" : "video"}, or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span> a
              file
            </p>
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
          
        )}
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {errors[name].message ? errors[name].message : label+ " is required"}
        </span>
      )}
    </div>
  );
};

export default Upload;