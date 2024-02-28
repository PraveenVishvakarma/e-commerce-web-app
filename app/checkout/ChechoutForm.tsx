'use client'

import { handleSetPaymentIntent, handleClearCart, handleCheckoutStatus} from "@/slices/cartSlice";
import { RootState } from "@/store/store";
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch} from "react-redux";
import Heading from "../components/products/Heading";
import Button from "../components/products/Button";
import { useRouter } from "next/navigation";

interface CheckoutFormProps{
    clientSecret:string,
    handlePaymentSuccess:(value:boolean)=>void,
}
const CheckoutForm:React.FC<CheckoutFormProps>=({
    clientSecret,
    handlePaymentSuccess,
})=>{
    const {subtotal}=useSelector((state:RootState)=>state.cart);
    const stripe=useStripe();
    const elements=useElements();
    const[isLoading, setIsLoading]=useState(false);
    const dispatch=useDispatch();
    const router=useRouter();

    useEffect(()=>{
        if(!stripe){
            return
        }
        if(!clientSecret){
            return
        }
        handlePaymentSuccess(false);
    },[stripe]);

    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault();
        if(!stripe || !elements){
            return
        }
        setIsLoading(true)
        stripe.confirmPayment({
            elements,
            redirect:"if_required",
        })
        .then((result:any)=>{
                if(result.paymentIntent.status=="succeeded"){
                handlePaymentSuccess(true);
                dispatch(handleCheckoutStatus(true));
                toast.success("Checkout Success");
                }
            setIsLoading(false);
        }).then(()=>{
            router.push("/checkoutSuccess")
            
        })
    }

    return <form onSubmit={handleSubmit} id="payment-form">
        <div className="mb-6">
            <Heading title="Enter your details to complete checkout" />
        </div>
        <h2 className="font-semibold mb-2">Address Information</h2>
        <AddressElement options={{
            mode:"shipping",
            allowedCountries:['IN', "US"]
        }} />
        <h2 className="font-semibold mt-4 mb-2">Payment Information</h2>
        <PaymentElement id="payment-element" options={{
            layout:"tabs"
        }} />
        <div className="py-4 text-center text-slate-700 text-xl font-bold">
            Total: {subtotal}
        </div>
        <Button label={isLoading ? "Processing":"Pay now"} disabled={isLoading || !stripe || !elements} onClick={()=>{}} />
    </form>
}
 export default CheckoutForm;