import { toast } from 'react-hot-toast';
import {studentEndpoints} from '../api'
import { apiConnector } from "../apiConnector";
import { resetCart } from '../../slices/cartSlice';
import rzpLogo from '../../assets/Logo/rzp_logo.png'

const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }

        script.onerror = () => {
            resolve(false);
        }

        document.body.appendChild(script);
    })
}

export async function buyCourse(courses, token, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...");

    try {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res) {
            toast.error("Razorpay SDF Failed to load");
        }

        //initiate order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, {
            courses
        }, { Authorization: `Bearer ${token}`});
        // console.log("Order Response------", orderResponse);

        if(!orderResponse.data.success) {
            throw new Error(orderResponse?.data?.message);
        }

        //options
        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id: orderResponse.data.data.id,
            name: "StudyNotion",
            description: "Thank You for purchasing the course",
            image: rzpLogo,
            prefill: {
                name: `${userDetails.firstName + userDetails.lastName}`,
                email: userDetails.email
            },
            handler: function(response) {
                //send sccesssfull
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token);

                verifyPayment({...response, courses}, token, navigate, dispatch);
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("Payment Failed", function(response) {
            toast.error("Oops! Payment Failed");
            console.log(response);
        })
         
    }
    catch(error) {
        console.log("Payment error----------", error);
        toast.error("Could not make payment");
    }

    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount
        }, { Authorization: `Bearer ${token}`})
    }
    catch(error) {
        console.log("Payment Sucess email error", error);
    }
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    // dispatch(setPatment)
    // Something here!

    try {
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`
        })

        if(!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("Payment Successfull. you are added to the course");
        dispatch(resetCart()); 
        navigate("/dashboard/enrolled-courses");
    }
    catch(error) {
        console.log("Payment verify error -----", error);
        toast.error("Could not verify payment");
    }

    // Something here!
    toast.dismiss(toastId);
}