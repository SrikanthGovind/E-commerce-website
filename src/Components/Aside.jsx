import React, { useState } from 'react'
import style from './Styles/Aside.module.css'
import { GiMineWagon } from "react-icons/gi";
import { GoHistory } from "react-icons/go";
import { MdOutlinePendingActions } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { productAction } from './Redux';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Aside() {
  const [show,setshow]=useState(false)
  const dispatch=useDispatch();
  const check=useSelector((state)=>state.product.checkeditems)
  const navigate=useNavigate();

  function toggle(e){
    e.preventDefault();
    e.stopPropagation();
    setshow(prev=>!prev)
  }  
  function handleclick(page){
    if(page==='cateogory'){
      navigate('/layout')
      return
    }
     navigate(`/layout/${page}`)
  }
  function handleCheckbox(e,category) {
    e.stopPropagation(); 
    const {checked}=e.target
     if(checked){
        dispatch(productAction.checkedProducts(category))
     }
     else{
       const filter=check.filter((ele)=>ele!==category)
       dispatch(productAction.checkedProducts(filter))
     }
  }
  
  return (
    <div className={style.aside}>
        <ul>
            <li className={style.cateogorylist} onClick={()=>handleclick('cateogory')}>
            <div className={style.icon}>
            <span  >
            <GiMineWagon/> 
            </span>
            <p>Cateogory</p>           
            </div>
            </li>
            <li className={style.cateogorylist} onClick={()=>handleclick('products')}>
            <div className={style.icon}>
            <span>     
            <GoHistory/>
            </span>
            <p>  Products</p>
             <span className={show ? style.iconcollapseactive : style.iconcollapse} onClick={toggle}> 
            <IoIosArrowDown />
            </span>
            </div>
            {show && <ul className={style.item}>
              <li>
                <input type="checkbox" onClick={(e)=>handleCheckbox(e,'all')}  />
                <label>All</label>
              </li>
              <li>
                <input type="checkbox" onClick={(e)=>handleCheckbox(e,'mens clothing')}  />
                <label>Men's Clothing</label>
              </li>
              <li>
                <input type="checkbox" onClick={(e)=>handleCheckbox(e,'womens clothing')} />
                <label>Women's Clothing</label>
              </li>
              <li>
                <input type="checkbox" onClick={(e)=>handleCheckbox(e,'electronics')} />
                <label>Electronics</label>
              </li>
              <li>
                <input type="checkbox" onClick={(e)=>handleCheckbox(e,'jewelery')} />
                <label>Jewelery</label>
              </li>
            </ul>}
            </li>
            <li onClick={()=>handleclick('orders')}>
            <span> <MdOutlinePendingActions/></span>
           
             Orders
            </li>
        </ul>
    </div>
  )
}
