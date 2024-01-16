import React from 'react'
import ProgressBar from '@ramonak/react-progress-bar'

const MyEnrolledCourse = ({course}) => {
  return (
    <div>
        <div>
            <img src={course.thumbnail} />
            <div>
                <p>{course.courseName}</p>
                <p>{course.courseDescription}</p>
            </div>
        </div>
        <div>
            {course?.totalDuration}
        </div>

        <div>
            <p>Progress: {course.progressPercentage || 0}%</p>
            <ProgressBar
                completed={course.progressPercentage || 0}
                height='8px'
                isLabelVisible={false}
            />
        </div>
    </div>
  );
}

export default MyEnrolledCourse