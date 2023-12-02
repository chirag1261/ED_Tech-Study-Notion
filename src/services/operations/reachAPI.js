import { toast } from "react-hot-toast";
import { contactusEndpoint } from "../api";
import { setLoading } from "../../slices/authSlice";
import { apiConnector } from "../apiConnector";

const { CONTACT_US_API } = contactusEndpoint;

export function contactUs(data) {
    return async (dispatch) => {

        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        
        try {
            const response = await apiConnector("POST", CONTACT_US_API, data);

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success(response.data.message);
        } 
        catch (error) {
            toast.error("Could Not Send Message")
            console.log(error);
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}