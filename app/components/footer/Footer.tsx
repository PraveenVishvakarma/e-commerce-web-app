import React from 'react'
import Container from '../Container';
import FooterList from './FooterList';
import Link from 'next/link';
import {MdFacebook} from 'react-icons/md'
import {
    AiFillTwitterCircle,
    AiFillYoutube,
    AiFillInstagram

} from 'react-icons/ai'

const Footer=()=> {
  return(
    <footer className='bg-slate-700 text-slate-200 text-sm'>
        <Container>
            <div className='flex flex-col md:flex-row justify-between pt-16 pb-8'>
                <FooterList>
                    <h3 className='font-bold mb-2'>Shop Categories</h3>
                    <Link href={"#"}>Phones</Link>
                    <Link href={"#"}>Laptops</Link>
                    <Link href={"#"}>Desktops</Link>
                    <Link href={"#"}>Watches</Link>
                    <Link href={"#"}>TVs</Link>
                    <Link href={"#"}>Accessories</Link>
                </FooterList>
                <FooterList>
                    <h3 className='font-bold mb-2'>Shop Categories</h3>
                    <Link href={"#"}>Contact Us</Link>
                    <Link href={"#"}>Shiping Policy</Link>
                    <Link href={"#"}>Return and Exchange</Link>
                    <Link href={"#"}>FAQs</Link>
                </FooterList>
                <div className='w-full md:w-1/3'>
                    <h3 className='font-bold mb-2'>About us</h3> 
                    <p className='mb-2'>At our elctronic we are dedicated to provide the latest  and greatest divices and accesseries with a wide selection of phones tvs laptops watches and accesseries</p>
                    <p>
                        &copy; {new Date().getFullYear()} E-Bazar. All rights reserved 
                    </p>
                </div>
                <FooterList>
                    <h3 className='font-bold mb-2'>Follow us</h3>
                    <div className='flex gap-2'>
                        <Link href={"#"}>
                            <MdFacebook size={24} /> 
                        </Link>
                        <Link href={"#"}>
                            <AiFillTwitterCircle size={24} /> 
                        </Link>
                        <Link href={"#"}>
                            <AiFillInstagram size={24} /> 
                        </Link>
                        <Link href={"#"}>
                            <AiFillYoutube size={24} /> 
                        </Link> 
                    </div>
                </FooterList>
            </div>
            
        </Container>
    </footer>
  )
}

export default Footer;
