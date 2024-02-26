const BASE_URL = process.env.REACT_APP_BASE_URL

export const categories = {
    CATEGORIES_API: BASE_URL + "/course/showAllCategories"
}

export const endpoints = {
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
    SIGNUP_API: BASE_URL + "/auth/signup",
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    LOGIN_API: BASE_URL + "/auth/login",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword"
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
    CREATE_COURSE_API: BASE_URL + "/course/createCourse",
    CREATE_SECTION_API: BASE_URL + "/course/addSection",
    UPDATE_SECTION_API: BASE_URL + "/course/updateSection"
}
