import { toast } from "react-hot-toast";
import { profileEndpoints } from "../api";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";

const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API, GET_INSTRUCTOR_DATA_API } = profileEndpoints

export function fetchUserDetails(token) {
    return async (dispatch) => {

        try {
            const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
                Authorization: `Bearer ${token}`,
            })

            if(response?.data?.success) {
                dispatch(setUser(response.data.userDetails));
            }
        }
        catch(error) {
            console.log("Cannot fetch user details...", error);
        }
    }
}

export async function fetchUserEnrolledCourses(token) {
    let result = []

    try {
        const response = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API, null, {
            Authorization: `Bearer ${token}`,
        })
  
        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        result = response.data.data
    } 
    catch (error) {
      console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
      toast.error("Could Not Get Enrolled Courses")
    }
    
    return result
}

export async function getInstructorData(token) {
    const toastId = toast.loading("Loading...");
    let result = [];

    try {
        const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
            Authorization: `Bearer ${token}`
        })

        result = response?.data?.courses;
    }
    catch(error) {
        console.log("GET_INSTRUCTOR_DATA_API Error", error);
        toast.error("Could not get Instructor Data");
    }

    toast.dismiss(toastId);
    return result;
}