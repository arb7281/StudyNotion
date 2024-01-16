import React from 'react'
import { useSelector } from 'react-redux'
import MyEnrolledCourse from './enrolledCourses/MyEnrolledCourse'

const EnrolledCourses = () => {

    const enrolledCourses = useSelector((state) => state.profile)

  return (
    <div>
      <h2>Enrolled Courses</h2>
      <div>To select pending and completed courses</div>
      <div>
        {!enrolledCourses ? (
          <div>Loading...</div>
        ) : !enrolledCourses.length ? (
          <div>You have not enrolled in any courses</div>
        ) : (
          <div>
            <div>
              {" "}
              {/* make this div flex */}
              <div>Course Name</div>
              <div>Durations</div>
              <div>Progress</div>
            </div>
            <div>
                {
                    enrolledCourses.map((course, index) => (
                         <MyEnrolledCourse key={index} course={course}/>
                    ))
                }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EnrolledCourses