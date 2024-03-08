export const revalidate=0;
import HomeBanner from './components/HomeBanner'
import Container from './components/Container'
import { products } from '@/utils/products'
import truncate from '@/utils/truncate'
import ProductCard from './components/products/ProductCard'
import getProducts, { IProductParams } from '@/actions/getProducts'
import NullData from './components/NullData'

interface HomeProps{
  searchParams:IProductParams
}

export default async function Home({searchParams}:HomeProps) {
  const products=await getProducts(searchParams);
  if(products.length===0){
    return <NullData title='Oops! No Product found. Click "All" to clear the filter' />
  }

  const suffledArray=(arr:any)=>{
    for(let i=arr.length-1; i>0; i--){
      const j=Math.floor(Math.random()*(i+1));
      [arr[i],arr[j]]=[arr[j],arr[i]];
    }
    return arr;
  }
  const suffedProducts=suffledArray(products);
  return ( 
    <div className='p-8'> 
      <Container>
        <div>
          <HomeBanner/>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {suffedProducts.map((product:any)=>{
            return <ProductCard data={product} key={product.id} />
          })}
        </div> 
     </Container>
    </div>
    
    
  ) 
}

