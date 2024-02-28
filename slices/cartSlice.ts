import { CartProductType } from "@/app/product/[productId]/ProductDetail";
import { createSlice } from "@reduxjs/toolkit";
interface IntialState{
  cartTotalQuantity:number,
  subtotal:number,
  cartProducts:CartProductType[] | null,
  paymentIntent:string| null,
  checkoutStatus:boolean,
}

const initialState:IntialState = {
  cartProducts: [],
  cartTotalQuantity:0,
  subtotal:0,
  paymentIntent:null,
  checkoutStatus:false
} 

const cartSlice = createSlice({
  name: "cartProducts",
  initialState,
  reducers: {
    addtoCart:(state, action)=>{
        state.cartProducts?.push(action.payload);
    },
    romoveProductFromCart:(state, action)=>{
      if(state.cartProducts){
        state.cartProducts=state.cartProducts.filter((item)=>{
          return item.id !== action.payload.id;
        })
      } 
    },
    increaseCartProduct:(state, action)=>{
      
      if(state.cartProducts){
        const existingIndex=state.cartProducts.findIndex((product)=>{
          return product.id===action.payload.id;
        })
        if(state.cartProducts[existingIndex].qauntity===99){
            return;
        }
       
        if(existingIndex>-1){
          state.cartProducts[existingIndex].qauntity=state.cartProducts[existingIndex].qauntity+1;
        }
      }
    },
    decreaseCartProduct:(state, action)=>{
      if(state.cartProducts){
        const existingIndex=state.cartProducts.findIndex((product)=>{
          return product.id===action.payload.id;
        })
        if(state.cartProducts[existingIndex].qauntity===1){
            return;
        }
       
        if(existingIndex>-1){
          state.cartProducts[existingIndex].qauntity=state.cartProducts[existingIndex].qauntity-1;
        }
      }
    },
    getTotal:(state)=>{
      if(state.cartProducts){
        const accumulator=state.cartProducts.reduce((accu,item)=>{
          const itemTotal=item.qauntity*item.price;
          accu.total+=itemTotal;
          accu.qnt+=item.qauntity;
          return accu;
        },{total:0,qnt:0})
        state.cartTotalQuantity=accumulator.qnt;
        state.subtotal=accumulator.total;
      }
    },
    handleSetPaymentIntent:(state, action)=>{
      state.paymentIntent=action.payload;
    },
    handleClearCart:(state)=>{
      state.cartProducts=[];
      state.cartTotalQuantity=0;
      state.subtotal=0;
    },
    handleCheckoutStatus:(state,action)=>{
      state.checkoutStatus=action.payload;
    }
  },
});

export const {handleCheckoutStatus, handleClearCart, addtoCart, romoveProductFromCart, increaseCartProduct, decreaseCartProduct, getTotal, handleSetPaymentIntent} = cartSlice.actions;

export default cartSlice.reducer;