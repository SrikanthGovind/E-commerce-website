import React from 'react'
import {NavLink} from 'react-router-dom'
import style from './Styles/Header.module.css'
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { productAction } from './Redux';

export default function Header() {
  const totalquantity=useSelector((state)=>state.cart.totalQuantity)
  const navigate=useNavigate()

  function handlelogout(){
    confirm("sure want to logout")
      navigate('/')
  }


  return (
    <div className={style.header}>
       <div className={style.headerlogo}>
        Style Aura
       </div>
         <ul className={style.headerlist}>
            <li>
                <NavLink to={'/layout'}
                  className={({ isActive }) => (isActive ? style.active : '')}
                  end
                >
                     Cateogory
                </NavLink>
            </li>
            <li>
                <NavLink to={'products'}
                  className={({ isActive }) => (isActive ? style.active : '')}>
                     Products
                </NavLink>
            </li>
            <li>
                <NavLink to={'orders'}
                  className={({ isActive }) => (isActive ? style.active : '')}>
                    Orders
                </NavLink>
            </li>
         </ul>
         <div className={style.headerbtn}>
            <button onClick={handlelogout}>LogOut</button>
         </div>
         <div className={style.carticon}>
           <NavLink to={'cart'}>           <IoCartOutline/></NavLink>
           <span>{totalquantity}</span>
         </div>
    </div>
  )
}
