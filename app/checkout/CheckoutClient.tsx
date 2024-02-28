'use client'
import { handleSetPaymentIntent } from "@/slices/cartSlice";
import { RootState } from "@/store/store";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector,useDispatch } from "react-redux";
import CheckoutForm from "./ChechoutForm";
import Button from "../components/products/Button";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const ChechoutClient=()=>{
    const [error, setError]=useState(false);
    const [loading, setLoading]=useState(false);
    const {cartProducts}=useSelector((state:RootState)=>state.cart);
    const {paymentIntent}=useSelector((state:RootState)=>state.cart);
    const[clientSecret, setClientSecret]=useState("");
    const dispatch=useDispatch();
    const router=useRouter();
    const[paymentSuccess, setPaymentSuccess]=useState(false);

        useEffect(()=>{
            if(cartProducts){  
                setError(false);
                setLoading(true);
                fetch("/api/create-payment-intent",{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        items:cartProducts,
                        payment_intent_id:paymentIntent,
                    })
                    }).then((res)=>{
                        setLoading(false);
                        if(res.status===401){
                            return router.push('/login');
                        }
                        return res.json();
                    }).then((data)=>{
                        setClientSecret(data.paymentIntent.client_secret);
                        dispatch(handleSetPaymentIntent(data.paymentIntent.id))
                    }).catch((error:any)=>{
                        setError(true)
                        console.log("Error", error);
                        toast("Something went wrong")
                    })
            }
        },[cartProducts, paymentIntent]);

        const options:StripeElementsOptions={
            clientSecret,
            appearance:{
                theme:"stripe",
                labels:"floating",
            }
        }

        const handlePaymentSuccess=useCallback((value:boolean)=>{
            setPaymentSuccess(value)
        },[])
    return(
        <div className="w-full">
      {!paymentSuccess && clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} handlePaymentSuccess={handlePaymentSuccess} />
        </Elements>
      )}
      {loading && <p className="text-center">Loading Checkout</p> }
      {error && <p className="text-center text-rose-500">Something went wrong...</p> }

    </div>
    )
}
export default ChechoutClient;