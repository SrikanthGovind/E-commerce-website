import React from 'react'
import Cartitem from './Cartitem'
import  style from '../Styles/Cart.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { orderActions } from '../Redux'
import { useState } from 'react'

export default function Carts() {
  const dispatch=useDispatch();
   const isavailable=useSelector((state)=>state.cart.items)
   console.log(isavailable)
   const totalItems = isavailable.length;
   const totalPrice = isavailable.reduce((acc, item) => acc + item.price * item.quantity, 0);
   const platformFee = totalPrice * 0.05;
   const deliveryCharge = totalPrice > 400 ? 0 : 50; 
   const grandTotal = totalPrice + platformFee + deliveryCharge;
   const [show,setshow]=useState(false)

   function handleProceed(data){
      dispatch(orderActions.handlemultipleOrder(data))
      setshow(true)
      setTimeout(()=>{
        setshow(false)
      },1000)
   }
  
  return (
    <>
    {isavailable.length===0 && <>
    <p className={style.para}>Oops! No Items In Cart</p>
    <h4 className={style.head}>+Add Items</h4>

    </>
    }
    {isavailable.length!==0 && 
      <div className={style.CartWrapper}> 
      <div className={style.cart}>
        <Cartitem/>
      </div>
      <div className={style.cartTotal}>
            <h3 className={style.cartTotalTitle}>Cart Summary</h3>
            <div className={style.cartTotalDetails}>
              <div className={style.cartHead}>
                <span>Total Items : {totalItems}</span>
               <ul>
               {
                isavailable.map((ele)=>{
                 return <div className={style.item}> 
                 <li key={ele.id}>{ele.title.slice(0,40)}</li>
                 <span>$ {ele.price * ele.quantity}</span>
                 </div>
                })
               } 
               </ul>
              </div>
              <div className={style.cartTotalRow}>
                <span>Total Price</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className={style.cartTotalRow}>
                <span>Platform Fee (5%)</span>
                <span>${platformFee.toFixed(2)}</span>
              </div>
              <div className={style.cartTotalRow}>
                <span>Delivery Charge</span>
                <span>${deliveryCharge.toFixed(2)}</span>
              </div>
              <div className={style.cartTotalRow}>
                <span className={style.grandTotal}>Grand Total</span>
                <span className={style.grandTotal}>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
            <button className={style.checkoutButton} onClick={()=>handleProceed(isavailable)}>Proceed to Checkout</button>
          </div>

        </div>
    }
    {show && 
      <div className={style.cartmessage}>Order Placed Successfully</div>
     }
    </>
  )
}
