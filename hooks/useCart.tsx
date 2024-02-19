import { CartProductType } from "@/app/product/[productId]/ProductDetail";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
type CartContextType={
    cartTotalQuantity:number,
    cartProducts:CartProductType[] | null,
    handleAddCartProduct:(product:CartProductType)=> void,
}
export const CartContext=createContext<CartContextType | null>(null);

interface Props{
    [propName:string]:any;
}

export const CartContextProvider=(props:Props)=>{
    const[cartTotalQuantity, setCartTotalQuantity]=useState(0);
    const[cartProducts, setCartProduct]=useState<CartProductType[] | null>(null);
     
    useEffect(()=>{
        const cartItems:any=localStorage.getItem('eShopCartItems');
        const cProducts:CartProductType[]|null=JSON.parse(cartItems);
        setCartProduct(cProducts);
        console.log("useEffect");
    },[]) 

    

    const handleAddCartProduct=(product:CartProductType)=>{
        
        toast.success("Product Added to Cart");
         setCartProduct((pre)=>{
            let updatedCart;
            if(pre){
                updatedCart=[...pre, product]
            }
            else{
                updatedCart=[product]
            }
            console.log("hhidudds jdsd");
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
            return updatedCart;
         })
    }
    const value={
        cartTotalQuantity,
        cartProducts,
        handleAddCartProduct,
    }

    return <CartContext.Provider value={value} {...props} />
}

export const useCart=()=>{
    const context=useContext(CartContext);
    if(context===null){
        throw new Error("useCart must be used within a provider")
    }

    return context;
}