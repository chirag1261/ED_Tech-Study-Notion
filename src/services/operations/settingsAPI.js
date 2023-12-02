import { toast } from "react-hot-toast";
import { settingsEndpoints } from "../api";
import { setLoading } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { fetchUserDetails } from "./profileAPI";
import { logout } from "./authAPI";

const { UPDATE_DISPLAY_PICTURE_API , UPDATE_PROFILE_API, CHANGE_PASSWORD_API , DELETE_PROFILE_API} = settingsEndpoints;

export function changePassword(oldPassword, newPassword, token) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("PUT", CHANGE_PASSWORD_API, {oldPassword, newPassword},  {
                Authorization: `Bearer ${token}`
            });

            if(response?.data?.success) {
                toast.success(response.data.message);
            }
        }
        catch(error) {
            if(error?.response?.data?.message) {
                toast.error(error.response.data.message)
            }

            console.log(error);
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function uploadProfilePic(file, token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Uploading profile picture...");
        dispatch(setLoading(true));
    
        try {
            const formData = new FormData();
            formData.append("displayPicture", file);
    
            const response = await apiConnector("PUT", UPDATE_DISPLAY_PICTURE_API, formData, {
                Authorization: `Bearer ${token}`
            });
    
            if (response?.data?.success) {
                toast.success(response.data.message);
                await dispatch(fetchUserDetails(token));
                navigate("/dashboard/my-profile")
            }
        } 
        catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            }
            console.log(error);
        }
    
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}

export function changeProfileInfo(data, token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Updating Profile...");
        dispatch(setLoading(true));
    
        try {
            const response = await apiConnector("PUT", UPDATE_PROFILE_API, data, {
                Authorization: `Bearer ${token}`
            });

            if (response?.data?.success) {
                toast.success(response.data.message);
                await dispatch(fetchUserDetails(token));
                navigate("/dashboard/my-profile")
            }
        } 
        catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            }
            console.log(error);
        }
    
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}

export function deleteAccount(token) {
    return async (dispatch) => {
        const toastId = toast.loading("Deleting Account...");
        dispatch(setLoading(true));
    
        try {
            const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
                Authorization: `Bearer ${token}`
            });

            if (response?.data?.success) {
                toast.success(response.data.message);
                await dispatch(logout());
            }
        } 
        catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            }
            console.log(error);
        }
    
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}