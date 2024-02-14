import React from 'react'

interface IParam{
    productId?:string;
}

export default function productPage({params}:{params:IParam}) {
    console.log(params,+"params");
    return (
    <div>Product Page + "......"</div>
  )
}
