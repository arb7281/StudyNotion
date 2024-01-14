import React from 'react'
import Template from '../components/core/Homepage/Template'
import signup from '../assets/login&signup/signup.png'

function Signup({setIsLoggedIn}) {
  return (
    <Template 
      title="Join the millions learnng to code with StudyNotion for free"
      desc1="Build skills for today, tomorrow and beyond."
      desc2="Education to future proof your career."
      image={signup}
      formtype="signup"
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Signup