import Link from "next/link";
import { CartProductType } from "../product/[productId]/ProductDetail";
import truncate from "@/utils/truncate";
import Image from "next/image";
import { fromatPrice } from "@/utils/FormatPrice";
import SetQuantity from "../components/products/SetQuantity";
import {useDispatch, useSelector} from "react-redux";
import { romoveProductFromCart, increaseCartProduct, decreaseCartProduct, getTotal} from "@/slices/cartSlice";
import { AppDispatch, RootState } from "@/store/store";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

interface ItemContentProps{
    item:CartProductType;
}
const ItemContent:React.FC<ItemContentProps>=({item})=>{
    const dispatch=useDispatch<AppDispatch>();
    const {cartTotalQuantity}=useSelector((state:RootState)=>state.cart);
    const {cartProducts}=useSelector((state:RootState)=>state.cart);
    
    

    useEffect(()=>{
        dispatch(getTotal());
    },[cartProducts]);

    const handleRemovefromCart=()=>{
        dispatch(romoveProductFromCart(item));
        toast.success("Product Removed Successfully")
    }
    const handleQuantityDecrease=()=>{
        dispatch(decreaseCartProduct(item));
        if(item.qauntity===1){
            toast.error("Item quantity can not be less than one");
        } 
    }
    

    const handleQuantityIncrease=()=>{
        if(item.qauntity===99){
            toast.error("Opps ! You have reached maximum limit");
        }
        dispatch(increaseCartProduct(item));
    }
    return(
        <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] py-4 items-center border-slate-200">
            <div className="col-span-2 flex gap-2 md:gap-4 justify-self-start">
                <Link href={`/product/${item.id}`}>
                    <div className="relative w-[70px] aspect-square">
                        <Image alt={item.name} fill src={item.selectedImg.image} className="object-contain" />
                    </div>
                </Link>
                <div>
                    <Link href={`/product/${item.id}`}>
                        {truncate(item.name)}
                    </Link>
                    <div>{item.selectedImg.color}</div>
                    <div className="w-[70px]">
                        <button onClick={handleRemovefromCart} className="text-slate-500 underline">Remove</button>
                    </div>
                </div>
            </div>
            <div className="justify-self-center">{fromatPrice(item.price)}</div>
            <div className="justify-self-center"><SetQuantity cartCounter={true} cartProduct={item} 
             handleQuantityDecrease={handleQuantityDecrease}
             handleQuantityIncrease={handleQuantityIncrease} /> 
             </div>
            <div className="justify-self-end">{fromatPrice(item.price* item.qauntity)}</div>
            
        </div>
    )
}
export default ItemContent;