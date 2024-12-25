import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from '../Styles/Cartitem.module.css'
import { IoMdStar } from 'react-icons/io'
import { cartActions } from '../Redux'
import { useState ,useEffect} from 'react'


export default function Cartitem() {
    const dispatch=useDispatch()
    const selecteditem=useSelector((state)=>state.cart.items)
    const quantitystate=useSelector((state)=>state.cart.quantitystate)
    const [show,setshow]=useState(false)
    console.log(quantitystate)
    

    function Quantity(type,id){
           dispatch(cartActions.Quantity({type,id}))
    }

     function handleRemove(id){
           dispatch(cartActions.removeItemtoCart(id))
           setshow(true)
           setTimeout(()=>{
             setshow(false)
           },1000)
     }
     useEffect(() => {
      if (quantitystate) {
        setshow(true);
        setTimeout(() => {
          setshow(false);
        }, 1000);
        dispatch(cartActions.quantitystate())
      }
    }, [quantitystate]);

  return (<>     

      {selecteditem.map((ele)=>{
        return           <div key={ele.id} className={style.cartItem} > 
            <div className={style.cartImage}>
            <img src={ele.image}/>
            </div>
            <div className={style.cartDetails}>
                    <h1>{ele.title}</h1>
                    <p>{ele.description.slice(0,250)}</p>
                    <button className={style.btn}>{ele.rating.rate}<span><IoMdStar/></span></button>
                   <div className={style.cartPrice}>
                     <p>Price : {'$'+ele.price}<span>$787</span></p>
                      <h3>Total : <span>$ {ele.quantity * ele.price}</span></h3>
                   </div>  
                   <div className={style.wrapper}>
                   <div className={style.quantity}>
                   <button onClick={()=>Quantity('decrease',ele.id)}>-</button>
                    <button>{ele.quantity}</button>
                    <button onClick={()=>Quantity('increase',ele.id)}>+</button>
                   </div>   
                     <div className={style.cartButtons}>
                     <button  onClick={()=>handleRemove(ele.id)}>Remove Item</button>
                  </div>    
                  </div>  
            </div>

            </div> 
       })}
     {show  && <div className={style.removemessage}>item Removed from Cart</div>}
       </>
  )
}
