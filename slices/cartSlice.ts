import { CartProductType } from "@/app/product/[productId]/ProductDetail";
import { createSlice } from "@reduxjs/toolkit";
interface IntialState{
  cartTotalQuantity:number,
  cartProducts:CartProductType[] | null,
}

const initialState:IntialState = {
  cartProducts: [],
  cartTotalQuantity:0,
} 

const cartSlice = createSlice({
  name: "cartProducts",
  initialState,
  reducers: {
    addtoCart:(state, action)=>{
        state.cartProducts?.push(action.payload);
        localStorage.setItem('eShopCartItems', JSON.stringify(state.cartProducts));
    },
    romoveProductFromCart:(state, action)=>{
      alert("conrole reaches hererr ");
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
    }
  },
});

export const { addtoCart, romoveProductFromCart, increaseCartProduct, decreaseCartProduct} = cartSlice.actions;

export default cartSlice.reducer;