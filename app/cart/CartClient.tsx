import { RootState } from "@/store/store";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import {useSelector } from "react-redux";
import { CartProductType } from "../product/[productId]/ProductDetail";
import Heading from "../components/products/Heading";
import Button from "../components/products/Button";
import ItemContent from "./ItemContent";
const CartClient=()=>{
    const {cartProducts}=useSelector((state:RootState)=>state.cart);
    if(!cartProducts || cartProducts.length===0){
        return(
            <div className="flex flex-col items-center">
                <div className="text-2xl">Your Cart is Empty</div>
                <div>
                    <Link href={"/"} className="flex text-gray-500 items-center gap-1 mt-2">
                    <MdArrowBack/>
                    <span>Start Shopping</span>
                    </Link>
                </div>
            </div>
        )
    }
    return (
        <div>
            <Heading title="Shopping Cart" center />
            <div className="grid grid-cols-5 text-sm gap-4 p-2 items-center mt-8">
                <div className="col-span-2 justify-self-start">Product</div>
                <div className="justify-self-center" >Price</div>
                <div className="justify-self-center">Quantity</div>
                <div className="justify-self-end">Total</div>
            </div>
            <div>
                {cartProducts && cartProducts.map((item:CartProductType)=>{
                    return(
                        <ItemContent key={item.id} item={item}/>
                    )
                })}
            </div>
            <div className=" border-t-[1.5px] border-slate-200 gap-4 py-4 flex justify-between">
                <div className="w-[90px]">
                    <Button label="Clear cart" small outline onClick={()=>{}} />
                </div>
                <div className="flex flex-col items-start text-sm gap-1">
                    <div className="flex justify-between w-full text-base font-semibold">
                        <span>Subtotal</span>
                        <span>100,000</span>
                    </div>
                    <p>Taxes and Shipping is Calculated at Checkout</p>
                    <Button label="Chechout" small onClick={()=>{}} />
                    <Link href={"/"} className="flex text-gray-500 items-center gap-1 mt-2">
                    <MdArrowBack/>
                    <span>Continue Shopping</span>
                    </Link>
                </div>
               
            </div>
        </div>
    )
}

export default CartClient;