'use client'
import { safeUser } from "@/types";
import { useRouter } from "next/navigation";
import Button from "../components/products/Button";
import { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import { handleSetPaymentIntent, handleClearCart} from "@/slices/cartSlice";
import { RootState } from "@/store/store";

interface CheckoutTrueProps{
    currentUser:safeUser| null;
}
const CheckoutTrue:React.FC<CheckoutTrueProps>=({currentUser})=>{
    const router=useRouter();
    const dispatch=useDispatch();
    const {checkoutStatus}=useSelector((state:RootState)=>state.cart);
       useEffect(()=>{
        if(!currentUser){
            return router.push("/login");
        }
        else if(!checkoutStatus){
            return router.push("/cart");
        }
        dispatch(handleClearCart());
        dispatch(handleSetPaymentIntent(null));
       },[])

       
    return(
        <div className="w-full">
       <div className="">
      <div className="text-2xl text-center m-4">Payment Success</div>
      <div>
          <Button label="view your order" onClick={()=>{router.push("/order")}} />
      </div>
      </div> 
      </div>
    )
}

export default CheckoutTrue;