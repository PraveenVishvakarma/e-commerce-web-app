'use client'

import SetColor from "@/app/components/SetColor";
import { Rating } from "@mui/material";
import { useCallback, useState } from "react";
import SetQuantity from "@/app/components/products/SetQuantity";

interface productDetailProps{
    product:any;
}

export type CartProductType={
    id:string,
    name:string,
    description:string,
    category:string,
    brand:string,
    selectedImg:SelectedImgType,
    qauntity:number,
    price:number
}

export type SelectedImgType={
    color:string,
    colorCode:string,
    image:string
}
const ProductDetail:React.FC<productDetailProps>=({product}:{product:any})=>{

    const[cartProduct, setCartProduct]=useState<CartProductType>({
        id:product.id,
        name:product.name,
        description:product.description,
        category:product.category,
        brand:product.brand,
        selectedImg:{...product.images[0]},
        qauntity:1,
        price:product.price,
    })

    const handleColorSelect=useCallback((value:SelectedImgType)=>{
        setCartProduct((pre)=>{
            return {...pre, selectedImg:value};
        })
    }, [cartProduct.selectedImg]);

    const Divider=()=>{
        return <hr className="w-[30%] my-2"/>
    }

    const handleQuantityDecrease=useCallback(()=>{
        if(cartProduct.qauntity===1) return;
        setCartProduct((pre)=>{
            return {...pre, qauntity:pre.qauntity-1};
        })
    },[cartProduct])

    const handleQuantityIncrease=useCallback(()=>{
        setCartProduct((pre)=>{
            return {...pre, qauntity:pre.qauntity+1}
        })
    },[cartProduct])

    const productRating=product.reviews.reduce((accu:number ,item:any)=>item.rating+accu,0)/product.reviews.length;
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>Image</div>
            <div className="flex flex-col gap-1 text-slate-500 text-sm">
                <p className="text-3xl font-medium text-slate-700">{product.name}</p>
                <div className="flex gap-2 items-center ">
                        <Rating value={productRating} readOnly />
                    <div>{product.reviews.length} Reviews</div>
                </div>
                <Divider/>
                <p className="text-justify">{product.description}</p>
                <Divider/>
                <div>
                    <span className="font-semibold uppercase mr-2">category:</span>{product.category}
                </div>
                <div>
                    <span className="font-semibold uppercase mr-2">Brand:</span>{product.brand}
                </div>
                <div className={product.inStock?"text-teal-500":"text-red-500"}>{product.inStock?"In Stock":"Out of Stock"}</div>
                <Divider/>
                <div>
                    <SetColor cartProduct={cartProduct} handleColorSelect={handleColorSelect}
                    images={product.images}
                    />
                </div>
                <Divider/>
                <div>
                <SetQuantity cartProduct={cartProduct}
                handleQuantityDecrease={handleQuantityDecrease}
                handleQuantityIncrease={handleQuantityIncrease}
                />
                </div>
                <Divider/>
                <button className="bg-slate-500 text-white p-3 rounded-lg hover:opacity-70">Add to Cart</button>
            </div>
        </div>
    )
}

export default  ProductDetail;