import React from 'react'
import style from '../Styles/Order.module.css'
import { useSelector } from 'react-redux'

export default function Orders() {

 const data=useSelector((state)=>state.orders.items)
 console.log(data)
  return (
    <>
    <div className={style.OrdersContainer}>
        <h1>Order History</h1>
         <ul className={style.Orderslinks}>
          <li>All orders</li>
          <li>Order summary</li>
          <li>Completed</li>
          <li>Cancelled</li>
         </ul> 

         <div className={style.orderhistory}>
              <table>
                 <thead>
                    <th>Order ID</th>
                    <th>Product name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total price</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Status</th>
                 </thead>
                 <tbody>
                
               {data.length===0 &&  <tr><td colSpan='7'>No Order HIstory</td></tr>} 
               
                {data.map((ele)=>{
                 return <tr>
                    <td>#E{ele.id}Ad</td>
                    <td>{ele.title.slice(0,25)}</td>
                    <td>{ele.quantity}</td>
                    <td>${ele.price}</td>
                    <td>${ele.price * ele.quantity}</td>
                    <td>{ele.date}</td>
                    <td>{ele.type}</td>
                    <td>{ele.deliverystatus}</td>
                 </tr>
                })} 
                </tbody>
              </table>
         </div>
    </div>
    </>
  )
}
