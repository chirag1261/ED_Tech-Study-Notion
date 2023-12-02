import { toast } from "react-hot-toast";
import { catalogData } from "../api";
import { apiConnector } from "../apiConnector";

const { CATALOGPAGEDATA_API } = catalogData;

export async function getCatalogPageData(categoryId) {
    let result = [];
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("POST", CATALOGPAGEDATA_API, { categoryId: categoryId });
        
        if(!response?.data?.success) {
            throw new Error("Failed to fetch category page data.");
        }

        result = response?.data;
    }
    catch(error) {
        console.log("CATALOG PAGE ERROR ---------", error); 
        toast.error(error.message);
        // result = error?.response?.data;
    }

    toast.dismiss(toastId);
    return result;
}