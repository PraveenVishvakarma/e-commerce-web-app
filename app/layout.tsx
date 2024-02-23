import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Footer from './components/footer/Footer'
import Navbar from './components/nav/Navbar'
import { Toaster } from 'react-hot-toast'
import { Providers } from './provider/Providers'
import { getCurrentUser } from '@/actions/getCurrentUser'

const poppins = Poppins({ subsets: ['latin'], weight:['400','700'] }) 

export const metadata: Metadata = {
  title: 'E-Bazar',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser=await getCurrentUser();
  console.log("user>>>> ",currentUser);
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={`${poppins.className} text-slate-700`}>
        <Toaster toastOptions={{
          style:{
            background:'rgb(51 65 85)',
            color:"#fff",
          }
        }} />
        <Providers>
        <div className='flex flex-col min-h-screen'>
          <Navbar/>  
          <main className='flex-grow'>
            {children}
          </main>
          <Footer/>
        </div> 
        </Providers>
      </body>
    </html>
  )
}
