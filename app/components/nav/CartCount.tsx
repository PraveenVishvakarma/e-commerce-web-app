'use client'
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import {CiShoppingCart} from 'react-icons/ci'
import { useSelector } from 'react-redux';
const CartCount=()=>{
    const {cartTotalQuantity}=useSelector((state:RootState)=>state.cart);
    const router=useRouter();
    return(
        <div className='relative flex cursor-pointer' onClick={()=>router.push("/cart")}>
            <div className='text-3xl'>
                <CiShoppingCart/>
            </div>
            <span className='absolute text-sm top-[-10px] right-[-10px] bg-slate-700 text-white h-6 w-6 flex items-center justify-center rounded-full '>
            {cartTotalQuantity}</span>
        </div>
    )
}

export default CartCount;