import Link from 'next/link';
import React from 'react'
import Container from '../Container';
import { Redressed } from 'next/font/google';

const redressed=Redressed({subsets:["latin"],weight:["400"]});

 const Navbar=()=> {
  return (
    <div
    className='
    bg-slate-200
    sticky
    top-0
    w-full
    z-30
    shadow-sm
    '
    >
        <div className='py-4 border-b-[10px]'>
            <Container>
                <div 
                className='
                flex 
                justify-between
                items-center
                gap-3
                md:gap-0
                '>
                    <Link href={"/"}
                    className={`${redressed.className} font-bold text-2xl`}
                    >E-Bazar</Link>
                    <div
                    className='
                    hidden
                    md:block
                    '
                    >Search</div>
                    <div 
                    className='
                    flex 
                    justify-between
                    items-center
                    gap-8
                    md:gap-12
                    '>
                        <div>CartCount</div>
                        <div>UserMenu</div>
                    </div>
                </div>
            </Container>

        </div>
    </div>
  )
}

export default Navbar;