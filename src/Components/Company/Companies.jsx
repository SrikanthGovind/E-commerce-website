import React from 'react'
import Companydetails from './Companydetails'
import style from '../Styles/Companies.module.css'
import { NavLink } from 'react-router-dom'
import { productAction } from '../Redux'
import { useDispatch } from 'react-redux'

export default function Companies() {
  const dispatch=useDispatch();

 function handleclick(category){
    dispatch(productAction.selectedProduct(category))
 }

  return (<>
  <div className={style.catogrylink}>
    <NavLink to={'products'} onClick={()=>handleclick('mens clothing')} className={({isActive})=>(isActive ? style.active : '')} end>Mens</NavLink>
    <NavLink to={'products'} onClick={()=>handleclick('womens clothing')} className={({isActive})=>(isActive ? style.active : '')}>Womens</NavLink>
    <NavLink to={'products'} onClick={()=>handleclick('electronics')} className={({isActive})=>(isActive ? style.active : '')}>Electronics</NavLink>
    <NavLink to={'products'} onClick={()=>handleclick('jewelery')} className={({isActive})=>(isActive ? style.active : '')}>jewelery</NavLink>
  </div>
    <div className={style.companies}>
    <h1>
    All your business on one platform.
    <span>
    Simple, efficient, yet affordable!
    </span>
    </h1>

       <Companydetails type='mens clothing'/>
       <Companydetails type='womens clothing'/>
       <Companydetails type='jewelery'/>
       <Companydetails type='electronics'/>


    </div>
    </>
  )
}
