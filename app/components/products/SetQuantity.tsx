'use client'

import { CartProductType } from "@/app/product/[productId]/ProductDetail"

interface SetQuantityProps{
    cartCounter?: boolean;
    cartProduct:CartProductType;
    handleQuantityIncrease:()=>void;
    handleQuantityDecrease:()=>void;
}

const btnStyle='border-[1.2px] border-slate-300 px-2 rounded';
const SetQuantity:React.FC<SetQuantityProps>=({cartCounter,cartProduct, handleQuantityDecrease, handleQuantityIncrease})=>{
    console.log("cartProduct.qauntity");
    return(
        <div  className="flex gap-2 ">
            {cartCounter? null: <div className="font-seminbold uppercase">Quantity:</div>}
            <div className="flex gap-2">
                <button onClick={handleQuantityDecrease} className={btnStyle}>-</button>
                <div>{cartProduct.qauntity}</div>
                <button onClick={handleQuantityIncrease} className={btnStyle}>+</button>
            </div>
        </div>
    )
}

export default SetQuantity;