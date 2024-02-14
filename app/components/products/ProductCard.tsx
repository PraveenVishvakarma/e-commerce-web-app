'use client'
import { fromatPrice } from '@/utils/FormatPrice';
import truncate from '@/utils/truncate';
import { Rating } from '@mui/material';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'
import { isTemplateExpression } from 'typescript';


export default function ProductCard({data}:any) {

  const router=useRouter();
  const productRating=data.reviews.reduce((accu:number ,item:any)=>item.rating+accu,0)/data.reviews.length;

  return (
    <div
    onClick={()=>router.push(`/product/${data.id}`)}
    className='col-span-1 cursor-pointer p-2 border-[1.2px] border-slate-200 bg-slate-50 rounded-sm transition hover:scale-105 text-center text-sm'> 
      <div className='flex flex-col items-center w-full gap-1'>
        <div className='aspect-square overflow-hidden relative w-full'>
          <Image
           fill
           src={data.images[0].image}
           alt={data.name}
           className='w-full h-full object-contain '
           />
        </div>
        <div>{truncate(data.name)}</div>
        <div><Rating value={productRating} readOnly/> </div>
        <div>{data.reviews.length} reviews</div>
        <div className='font-semibold'>{fromatPrice(data.price)}</div>
      </div>
    </div>
  )
}
