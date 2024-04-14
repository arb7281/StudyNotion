const BASE_URL = process.env.REACT_APP_BASE_URL

export const categories = {
    CATEGORIES_API: BASE_URL + "/course/showAllCategories",
    CATEGORY_PAGE_DETAILS_API: BASE_URL + "/course/getCategoryPageDetails"
}

export const profileEndpoints = {
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
  }

export const endpoints = {
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
    SIGNUP_API: BASE_URL + "/auth/signup",
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    LOGIN_API: BASE_URL + "/auth/login",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword"
}

export const studentEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
  }

export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/contact/contactUs",
  }

export const settingsEndpoints = {
    UPDATE_PROFILE_API:BASE_URL + "/profile/updateProfile",
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    GET_USER_DETAILS: BASE_URL + "/profile/getUserdetails",
    DELETE_ACCOUNT_API: BASE_URL + "/profile/deleteProfile",
    GET_ENROLLED_COURSES: BASE_URL + "/profile/getEnrolledCourses"
}  

export const courseEndpoints = {
    GET_COURSE_AVERAGE_RATING: BASE_URL + "/course/getAverageRating",
    UPDATE_COURSE_API: BASE_URL + "/course/updateCourse",
    CREATE_COURSE_API: BASE_URL + "/course/createCourse",
    CREATE_SECTION_API: BASE_URL + "/course/addSection",
    UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
    DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
    DELETE_SUB_SECTION_API: BASE_URL + "/course/deleteSubSection",
    CREATE_SUB_SECTION_API: BASE_URL + "/course/addSubSection",
    UPDATE_SUB_SECTION_API: BASE_URL + "/course/updateSubSection",
    INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
    COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
    LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
    CREATE_RATING_API: BASE_URL + "/course/createRating",
}
