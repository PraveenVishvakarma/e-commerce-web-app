'use client'
import { handleSetPaymentIntent } from "@/slices/cartSlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector,useDispatch } from "react-redux";

const ChechoutClient=()=>{
    const [error, setError]=useState(false);
    const [loading, setLoading]=useState(false);
    const {cartProducts}=useSelector((state:RootState)=>state.cart);
    const {paymentIntent}=useSelector((state:RootState)=>state.cart);
    const[clientSecret, setClientSecret]=useState("");
    const dispatch=useDispatch();
    const router=useRouter();

    console.log("paymentIntent",paymentIntent);
    console.log("clientSecret", clientSecret);

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
                        console.log("data",data.paymentIntent.id);
                        dispatch(handleSetPaymentIntent(data.paymentIntent.id))
                    }).catch((error:any)=>{
                        setError(true)
                        console.log("Error", error);
                        toast("Something went wrong")
                    })
            }
        },[cartProducts, paymentIntent]);
    return(
        <>
        Checkout
        </>
    )
}
export default ChechoutClient;