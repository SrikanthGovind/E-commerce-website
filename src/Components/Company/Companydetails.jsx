import React, { useState } from 'react';
import style from '../Styles/companydetails.module.css';
import { useDispatch, useSelector } from 'react-redux';
import fetchdata from '../Redux';
import { useEffect } from 'react';
import { productAction } from '../Redux';
import { useNavigate } from 'react-router-dom';

export default function Companydetails({type}) {
  const dispatch=useDispatch();
  const navigate=useNavigate();

   useEffect(()=>{
        const fetchingdata=async ()=>{
        const data=await fetchdata();
  
        dispatch(productAction.fetchProducts(data))
      }
     fetchingdata()
  },[dispatch])

  const normalizeString = (str) => {
    return str.toLowerCase().replace(/[\s,']+/g, '').trim();
  };
  const productdata=useSelector((state)=>state.product.items)
  const data = productdata.filter((ele) => normalizeString(ele.category) === normalizeString(type));


  return (
    <div className={style.catogryContainer}>
      {data && data.length > 0 ? (
        <div className={style.category}>
          <h2 className={style.categoryTitle} onClick={()=>handleclick(type)}>{type}</h2>
          <div className={style.productContainer}>
            {data.map((product) => (
              <div key={product.id} className={style.productCard}>
                <img
                  src={product.image}
                  alt={product.title}
                  className={style.productImage}
                />
                <h3 className={style.productTitle}>{product.title}</h3>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No products available in this category.</p>
      )}
    </div>
  );
}

