import Container from '@/app/components/Container';
import React from 'react';
import getOrderById from '@/actions/getOrderById';
import OrderDetail from './OrderDetail';

interface IParam{
    orderId?:string;
}

export default async function Order({params}:{params:IParam}) {
    const order=await getOrderById(params);
    if(!order){
        return <div>No order</div>
    }
    return (
    <div className='p-8'>
        <Container>
            <OrderDetail order={order} />
        </Container>
    </div>
  )
}
