import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { calculateTotals,getCartItems } from "./features/cart/cartSlice";
import Modal from "./components/Modal";

function App() {
  const {cartItems,isLoading} = useSelector((store) => store.cart)
  const dispatch = useDispatch()

  const {isOpen} = useSelector((store) => store.modal)

  useEffect(() => {
    dispatch(calculateTotals())
  }
  ,[cartItems,dispatch])
  //svaki put kada updejtujemo nesto budimo ovo
  
  useEffect(() => {
    dispatch(getCartItems())
  },[dispatch])

  if(isLoading){
    return <div className="loading">
      <h1>Loading...</h1>
    </div>
  }
  return  ( 
    <main>
      { isOpen && <Modal/>}
      <Navbar/>
      <CartContainer/>
    </main>)
  
}
export default App;
