import Container from '@/app/components/Container';
import React from 'react'
import ProductDetail from './ProductDetail';
import { product } from '@/utils/product';

interface IParam{
    productId?:string;
}

export default function productPage({params}:{params:IParam}) {
    return (
    <div className='p-8'>
        <Container>
            <ProductDetail product={product} />
        </Container>
    </div>
  )
}
