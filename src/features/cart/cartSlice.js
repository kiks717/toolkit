import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const url = 'https://course-api.com/react-useReducer-cart-project'

const initialState = {
    cartItems : [],
    amount : 3,
    total :0,
    isLoading : true
}

export const getCartItems = createAsyncThunk('cart/getCartItems',() => {
    return fetch(url)
           .then(response => response.json())
           .catch((err) => console.log(err))
})
// return {cartItems : []}
    // cartItems : cartItems,
    //ovime se updejtuje ovaj property, ali automatski se uklanjaju ostali 
 const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers :{
        clearCart : (state) =>  {
            state.cartItems = [];
            //when utton is clicked empty cart
        },
        removeItem : (state,action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter(
                (item) =>item.id !== itemId);
                //if id is matching it wont been returened
        },
        increase : (state,{payload}) => {
            const cartItem = state.cartItems.find(
                (item) => item.id === payload.id)
            cartItem.amount = cartItem.amount + 1
        },
        decrease : (state,{payload}) => {
            const cartItem = state.cartItems.find(
                (item) => item.id === payload.id)
            cartItem.amount = cartItem.amount - 1
        },
        calculateTotals : (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount
                total += item.amount * item.price
            })
            state.amount = amount;
            state.total = total;
            /**
             * ovo ce da setuje na amount i total koji smo postavili
             * gore tj mnozice ukupnu vrijednost
             */
        },
    },
    extraReducers: {
        [getCartItems.pending] : (state,action) => {
            state.isLoading = true
        },
        [getCartItems.fulfilled] : (state,action) => {
            console.log(action);
            state.isLoading = false;
            state.cartItems = action.payload
        },
        [getCartItems.rejected] : (state,action) => {
            state.isLoading = false
        },
    }
})
export const{clearCart,removeItem,increase,decrease,calculateTotals} = cartSlice.actions
export default cartSlice.reducer

// import axios from 'axios'
// export const asyncGetCartItems = createAsyncThunk('cart/getCartItems',
// async (name) => {
//     try {
//         const response = await axios(url)
//         return response.data
//     } catch (error) {
        
//     }
// }) other aproach and in useEffect
/*
  useEffect(() => {
    dispatch(calculateTotals('name'))
  }
  ,[cartItems,dispatch]) */
