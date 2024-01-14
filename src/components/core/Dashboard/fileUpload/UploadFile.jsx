import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile } from '../../../../services/operations/authAPI';
import CTAButton from '../../Homepage/CTAButton';

const FileUpload = () => {
    const [fileSelected, setFileSelected] = useState(null);
    const dispatch = useDispatch()
    const {user} = useSelector((state)=> state.profile)

    function handleFileChange (event){
        const file = event.target.files[0];
        setFileSelected(file);
    }

    function handleUpload(){
        dispatch(uploadFile(fileSelected, user))
    }


  return (
    <div>
        <input type='file' onChange={handleFileChange}/>
        <CTAButton active={true} handleEvent={handleUpload}>Upload</CTAButton>
        {/* <button onClick={handleUpload}>Upload</button> */}
    </div>
  )
}

export default FileUpload