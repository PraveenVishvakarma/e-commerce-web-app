import Container from '@/app/components/Container';
import React from 'react'
import ProductDetail from './ProductDetail';
import { product } from '@/utils/product';
import ListRating from './ListRating';

interface IParam{
    productId?:string;
}

export default function productPage({params}:{params:IParam}) {
    return (
    <div className='p-8'>
        <Container>
            <ProductDetail product={product} />
            <div className='flex flex-col mt-20 gap-4'>
                <div>Product rating</div>
                <ListRating product={product} />
            </div>
        </Container>
    </div>
  )
}
