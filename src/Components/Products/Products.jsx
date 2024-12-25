import React, { useEffect, useRef, useState } from 'react'
import { IoCartOutline } from 'react-icons/io5'
import style from '../Styles/Products.module.css'
import { IoMdStar } from "react-icons/io";
import { useSelector } from 'react-redux';
import fetchdata, { cartActions } from '../Redux';
import { useDispatch } from 'react-redux';
import { productAction } from '../Redux';
import { buyActions } from '../Redux';
import { rentActions } from '../Redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Products() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [show,setshow]=useState(false)
  const productsdata= useSelector((state)=>state.product.items)
  const filterquery=useSelector((state)=>state.product.filterquery)
  const check=useSelector((state)=>state.product.checkeditems)
  const limit=useSelector((state)=>state.product.limit)
  const selecteditem=useSelector((state)=>state.product.selecteditem)
  const [loading,setloading]=useState(true)

 useEffect(()=>{
      
      const fetchingdata=async ()=>{
        setloading(true)
       const data=await fetchdata(limit);
       dispatch(productAction.fetchProducts(data))
      setloading(false)
    }
   fetchingdata()
},[dispatch,limit])


 const normalizeString = (str) => {
  return str.toLowerCase().replace(/[\s,']+/g, '').trim();
};

let filteredData='';
// filter for links
if(selecteditem){
  filteredData = productsdata.filter((ele) => normalizeString(ele.category) === normalizeString(selecteditem))
}

// filter for checkbox
if (check.includes("all")) {
  filteredData = productsdata;
} else {
  if (check.length > 0) {
    filteredData = productsdata.filter((ele) =>
      check.some((category) => normalizeString(ele.category) === normalizeString(category))
    );
  }
}
// filter for search query
if(filterquery){
  filteredData = productsdata.filter(product => normalizeString(product.title.toLowerCase()).includes(filterquery.toLowerCase()))
}

const productsToDisplay = filteredData ? filteredData : productsdata


 function addItemtoCart(id,e){
   e.preventDefault();
   e.stopPropagation();
      const selecteditem=productsdata.find((ele)=>ele.id===id)
      dispatch(cartActions.addItemtoCart(selecteditem));

      setshow(prev=>!prev)
      setTimeout(()=>{
        setshow(prev=>!prev)
      },1000)
 }
 
 function handleOrder(id,ordertype,e){
   e.preventDefault();
   e.stopPropagation();
    const Orderitem=productsdata.filter((ele)=>ele.id===id)
     if(ordertype==='buy'){
        dispatch(buyActions.addProduct(Orderitem))
        navigate('/layout/buy')
     }
     else{
        dispatch(rentActions.addProduct(Orderitem))
        navigate('/layout/rent')
     }
 }

//  handling scrolll search
function handlescroll(){
   if(window.innerHeight + document.documentElement.scrollTop +1 > document.documentElement.scrollHeight){
    dispatch(productAction.addlimit())
   }
}

useEffect(()=>{
  window.addEventListener('scroll',handlescroll);
  return ()=>window.removeEventListener('scroll',handlescroll)
},[])
let Timeout;

function seacrhProducts(value){
    dispatch(productAction.searchProducts(value))
}

  function handlesearch(event){
    clearTimeout(Timeout) 

    Timeout= setTimeout(()=>{
      seacrhProducts(event.target.value)
   },1000)
  }

  return (
<>
         <div className={style.search}>
             <input type='text'  placeholder='search...' onChange={handlesearch}/>
         </div>
    <div  className={style.products}> 
    {productsToDisplay.map((ele)=>{
     return  <><Link to={`${ele.id}`}  className={style.productItem} > 
         <div className={style.productimage}>
         <img src={ele.image}/>
         <span></span>
         </div>
         <div className={style.productDetails}>
                 <h1>{ele.title.slice(0,20)}</h1>
                 <p>{ele.description.slice(0,70)}</p>
                 <button>{ele.rating.rate}<span> <IoMdStar /></span></button>
                <div className={style.cart}>
                <p>{'$'+ele.price}<span>$787</span></p>
                <button onClick={(e)=>{addItemtoCart(ele.id,e)}} ><IoCartOutline/></button>  
                </div>           
         </div>
         <div className={style.productButtons}>
         <button onClick={(e)=>handleOrder(ele.id,'buy',e)}>Buy</button>
         <button onClick={(e)=>handleOrder(ele.id,'rent',e)}>Rent</button>
         </div>np
         </Link>  
        </>
    })}
   </div>
  {show && <div className={style.addMessage}>
        <h1>Item Added to Cart !!!</h1> 
   </div>}
   {
    loading && <div className={style.loading}>Loading...</div>
   }
   </>
  )
}
