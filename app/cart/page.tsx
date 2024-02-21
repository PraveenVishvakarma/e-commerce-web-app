'use client'
import React from 'react'
import Container from '../components/Container'
import CartClient from './CartClient'

export default function page() {
  return (
    <div className='mt-8'>
      <Container>
        <CartClient />
      </Container>
    </div>
  )
}
