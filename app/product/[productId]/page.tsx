import Container from '@/app/components/Container';
import React from 'react'
import ProductDetail from './ProductDetail';
import ListRating from './ListRating';
import { products } from '@/utils/products';
import getProducts from '@/actions/getProducts';
import AddRating from './AddRating';
import { getCurrentUser } from '@/actions/getCurrentUser';
import getProductById from '@/actions/getProductById';
import NullData from '@/app/components/NullData';

interface IParam{
    productId?:string;
}

export default async function productPage({params}:{params:IParam}) {
    const product=await getProductById(params);
    if(!product){
        return <NullData title='Product does not exist ' />
    }
    const currentUser=await getCurrentUser();
    return (
    <div className='p-8'>
        <Container>
            <ProductDetail product={product} />
            <div className='flex flex-col mt-20 gap-4'>
                <AddRating product={product} user={currentUser} />
                <ListRating product={product} />
            </div>
        </Container>
    </div>
  )
}
