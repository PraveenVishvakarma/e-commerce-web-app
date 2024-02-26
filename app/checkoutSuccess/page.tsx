'use client'
import { useRouter } from "next/navigation"
import Button from "../components/products/Button";
import { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import { handleSetPaymentIntent, handleClearCart} from "@/slices/cartSlice";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";


const CheckoutSuccess=()=>{
    const dispatch=useDispatch();
    const router=useRouter();


    useEffect(()=>{
        dispatch(handleClearCart());
        dispatch(handleSetPaymentIntent(null));
    },[])
    
    return(
        <Container><FormWrap>
    <div className="w-full">
    <div className="">
      <div className="text-2xl text-center m-4">Payment Success</div>
      <div>
          <Button label="view your order" onClick={()=>{router.push("/order")}} />
      </div>
    </div> 
   </div>
   </FormWrap> </Container>
   )
}

export default CheckoutSuccess;