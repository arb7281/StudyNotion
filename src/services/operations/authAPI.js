import { toast } from "react-hot-toast"
import { setLoading, setToken } from "../../slices/authSlice"
import {setEnrolledCourses, setWait} from "../../slices/profileSlice"
import { endpoints, settingsEndpoints } from "../api";
import { apiConnector } from "../apiconnector";
import { setUser } from "../../slices/profileSlice";
import { useSelector } from "react-redux";
;

// import { useDispatch } from "react-redux";

// const {token} = useSelector((state) => state.auth)

const {RESETPASSTOKEN_API, RESETPASSWORD_API, SIGNUP_API, SENDOTP_API, LOGIN_API, CHANGE_PASSWORD_API} = endpoints;

const {UPDATE_DISPLAY_PICTURE_API, UPDATE_PROFILE_API, GET_USER_DETAILS, DELETE_ACCOUNT_API, GET_ENROLLED_COURSES} = settingsEndpoints;

export function getPasswordResetToken(email, setEmailSent) {
    console.log("I am inside getPasswordResetToken")
return async(dispatch) => {
     dispatch(setLoading(true));
     try{
        const response = await apiConnector("POST", RESETPASSTOKEN_API, {email,}) /* backend ki reset password controller me usko body se email hi chahiye  */
        
        console.log("RESET PASSWORD TOKEN RESPONSE...", response);

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success(`${response.data.message}`)
        setEmailSent(true)
     }catch(error){
        console.log("Reset password token error", error)
        toast.error("Failed to send email while resetting password")
     }
     dispatch(setLoading(false));
}
}

export function resetPassword(password, confirmPassword, token) {
console.log("I am inside reset password")
    return async(dispatch) => {
        dispatch(setLoading(true));
        try{
           const response = await apiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token}) /* backend ki reset password controller me usko body se password, confirmPassword, token ye teen chahiye  */
           
           console.log("RESET PASSWORD RESPONSE...", response);
   
           if(!response.data.success){
               throw new Error(response.data.message)
           }
           toast.success(`${response.data.message}`)
           
        }catch(error){
           console.log("Password reset error", error)
           toast.error("Failed to reset your password")
        }
        dispatch(setLoading(false));
   }
}

export function signUp(firstName, 
   lastName, 
   email, 
   password, 
   confirmPassword,
   accountType, 
   otp,
   navigate
   ) {

      return async(dispatch) => {
         dispatch(setLoading(true));
         try{
            const response = await apiConnector("POST", SIGNUP_API, {firstName, 
               lastName, 
               email, 
               password, 
               confirmPassword,
               accountType, 
               otp}) /* bckend ki signup wali controller call hogi  */
            
            console.log("Signing Up response...", response);
    
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success(`${response.data.message}`)
            setToken(true)
            navigate("/login")
            
            
         }catch(error){
            console.log("Signing up error", error)
            toast.error("Failed to sign up, kuch to godbod he bhai")
         }
         dispatch(setLoading(false));
    }

}

export function sendOtp(email, navigate) {

      return async(dispatch) => {
         dispatch(setLoading(true));
         try{
            const response = await apiConnector("POST", SENDOTP_API, {email}) /* bckend ki signup wali controller call hogi  */
            
            console.log("Sending...", response);
    
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success(`${response.data.message}`)
            // navigate("/verify-email")//for this route go to app.js
            
         }catch(error){
            console.log("Sending OTP error", error)
            toast.error("Failed to send an OTP")
         }
         dispatch(setLoading(false));
    }

}

export function logIn(
   email, 
   password,
   navigate,
   ) {

      return async(dispatch) => {
         const toastId = toast.loading("Loading...")
         // const user = useSelector((state) => state.profile)
         dispatch(setLoading(true));
         try{
            const response = await apiConnector("POST", LOGIN_API , {
               email, 
               password, 
               }) /* bckend ki signup wali controller call hogi  */
            
            console.log("Login Response.data ...", response.data);
    
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            dispatch(setToken(response.data.token))
            localStorage.setItem("token", JSON.stringify(response.data.token))// isase ocalstorage me token ki value ja ke set hogi
            const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            console.log("printing user data from response ", response.data.user);
            dispatch(setUser({...response.data.user, image:userImage}))//isase user ki value save hongi profileSlice ki madad se
            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))
            // console.log("printing user data in login authAPI", user);
            toast.success(`${response.data.message}`)
            
            // toast.success(`${response.data.message}`)
            // setToken(response.data.token)
            navigate("/dashboard/my-profile")
            
            
         }catch(error){
            console.log("Login error", error)
            toast.error("Failed to log in check your credentials")
         }
         dispatch(setLoading(false));
         toast.dismiss(toastId)
    }

}

export function uploadFile(displayPicture,user) {

   return async(dispatch) => {
      dispatch(setLoading(true));
      try{
         console.log("I am inside try block of uploadFile")
         const formData = new FormData();
         formData.append('displayPicture', displayPicture)
         // console.log("printing displayPicture of image", formData)

         const response = await apiConnector("PUT", UPDATE_DISPLAY_PICTURE_API, formData, {
            Authorization: `Bearer ${user.token}`,
          }) /* backend ki signup wali controller call hogi */
         
         console.log("Sending...", response);
 
         if(!response.data.success){
             throw new Error(response.data.message)
         }
         toast.success(`${response.data.message}`)
         // navigate("/verify-email")//for this route go to app.js
         
      }catch(error){
         console.log("Sending uploadImage error", error)
         toast.error("Failed to change image")
      }
      dispatch(setLoading(false));
 }

}

export function updateProfile(formData, token){
   return async(dispatch) => {
      dispatch(setLoading(true));
      try{
         
         const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
            Authorization: `Bearer ${token}`,
          } )

          if(!response.data.success) throw new Error(response.data.message);

          console.log("printing response after receiving", response);

          const userImage = response.data?.updatedUserDetails?.image
        ? response.data.updatedUserDetails.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`
            console.log("printing user data from response ", response.data.updatedUserDetails);
            dispatch(setUser({...response.data.updatedUserDetails, image:userImage}))//isase user ki value save hongi profileSlice ki madad se
            localStorage.setItem("user", JSON.stringify(response.data.updatedUserDetails))

          toast.success(`${response.data.message}`)

      }catch(error){
         console.log("updating profile failed printing error", error)
         toast.error(`${error.mesage}`)
      }
      dispatch(setLoading(false));
   }
}

export function getUserDetails(token){
   // console.log("printing user object inside getUserDetails finction", user);

   return async(dispatch) => {
      const toastId = toast.loading("Loading...")
      // const user = useSelector((state) => state.profile)
      dispatch(setLoading(true));
      try{
         const response = await apiConnector("GET", GET_USER_DETAILS, null, {
            Authorization: `Bearer ${token}`,
         }) /* bckend ki signup wali controller call hogi  */
         
         console.log("User Response.data from getUserDetails...", response.data);
 
         if(!response.data.success){
             throw new Error(response.data.message)
         }
         // dispatch(setToken(response.data.user.token))
         // localStorage.setItem("token", JSON.stringify(response.data.user.token))//isase ocalstorage me token ki value ja ke set hogi
         const userImage = response.data?.user?.image
     ? response.data.user.image
     : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
         console.log("printing user data from response ", response.data.user);
         dispatch(setUser({...response.data.user, image:userImage}))//isase user ki value save hongi profileSlice ki madad se
         // localStorage.setItem("token", JSON.stringify(response.data.user.token))
         localStorage.setItem("user", JSON.stringify(response.data.user))
         // console.log("printing user data in login authAPI", user);
         toast.success(`${response.data.message}`)
         
         // toast.success(`${response.data.message}`)
         // setToken(response.data.token)
         // navigate("/dashboard/my-profile")
         
         
      }catch(error){
         console.log("User Fetch error", error)
         toast.error("Expired token")
      }
      dispatch(setLoading(false));
      toast.dismiss(toastId)
 }

}

export function changePassword(passData, token, navigate) {

   console.log("I am inside change password")
  
   
       return async(dispatch) => {
         dispatch(setLoading(true));
         const toastId = toast.loading("Loading...")
           try{
            
              const response = await apiConnector("POST", CHANGE_PASSWORD_API, passData, {
               Authorization: `Bearer ${token}`,
            }  ) /* backend ki reset password controller me usko body se password, confirmPassword, token ye teen chahiye  */
              
              console.log("CHANGE PASSWORD RESPONSE...", response);
      
              if(!response.data.success){
                  throw new Error(response.data.message)
              }
              dispatch(setToken(null));
              dispatch(setUser(null));
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              toast.error("Logged Out");
              navigate("/")
              
              toast.success(`${response.data.message}`)
              
           }catch(error){
              console.log("Password change error", error)
              toast.error("Failed to change your password")
           }
           dispatch(setLoading(false));
           toast.dismiss(toastId)
      }
   }

export function deleteAccount(token, password, navigate) {

      console.log("printing password in deleteAccount", password)
     
      
          return async(dispatch) => {
            dispatch(setLoading(true));
            const toastId = toast.loading("Loading...")
              try{
               
                 const response = await apiConnector("DELETE", DELETE_ACCOUNT_API, {password}, {
                  Authorization: `Bearer ${token}`,
               }  ) /* backend ki reset password controller me usko body se password, confirmPassword, token ye teen chahiye  */
                 
                 console.log("Delete Password Response...", response);
         
                 if(!response.data.success){
                     throw new Error(response.data.message)
                 }
                 dispatch(setToken(null));
                 dispatch(setUser(null));
                 localStorage.removeItem("token");
                 localStorage.removeItem("user");
                 toast.error("Logged Out");
                 navigate("/")
                 
                 toast.success(`${response.data.message}`)
                 
              }catch(error){
                 console.log("Delete Account error", error)
                 toast.error("Password is incorrect")
              }
              dispatch(setLoading(false));
              toast.dismiss(toastId)
         }
      }

export function getEnrolledCourses(token){
         // console.log("printing user object inside getUserDetails finction", user);
      
         return async(dispatch) => {
            const toastId = toast.loading("Loading...")
            // const user = useSelector((state) => state.profile)
            dispatch(setWait(true));
            try{
               const response = await apiConnector("GET", GET_ENROLLED_COURSES, null, {
                  Authorization: `Bearer ${token}`,
               }) /* bckend ki signup wali controller call hogi  */
               
               console.log("User Response.data from getEnrolledCourses...", response.data);
       
               if(!response.data.success){
                   throw new Error(response.data.message)
               }

               dispatch(setEnrolledCourses({...response.data.data}))

               toast.success(`${response.data.message}`)
   
            }catch(error){
               console.log("Course Fetch error", error)
               toast.error(error.message)
            }
            dispatch(setWait(false));
            toast.dismiss(toastId)
       }
      
      }      