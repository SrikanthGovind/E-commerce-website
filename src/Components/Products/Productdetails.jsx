import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import style from '../Styles/Productdetails.module.css';
import { useSelector,useDispatch } from 'react-redux';
import { buyActions } from '../Redux';
import { rentActions } from '../Redux';
import { IoCloseCircleOutline } from 'react-icons/io5';

export default function Productdetails() {
    const productdata=useSelector((state)=>state.product.items)
    const param=useParams()
    const navigate=useNavigate();
    const dispatch=useDispatch()
    const parse=Number(param.id)
    const  data=productdata.filter((ele)=>ele.id===parse)
    
    function handleOrder(id,ordertype){
               const Orderitem=productdata.filter((ele)=>ele.id===id)
                if(ordertype==='buy'){
                   dispatch(buyActions.addProduct(Orderitem))
                   navigate('/layout/buy')
                }
                else{
                   dispatch(rentActions.addProduct(Orderitem))
                   navigate('/layout/rent')
                }
    }
    function handleBackClick() {
      navigate(-1); 
  }

  return (
    <>
      <div className={style.backButton} onClick={handleBackClick}>
                <IoCloseCircleOutline size={30} />
      </div>
     {data.map((ele)=>{

   return <div className={style.ProductDetails}>
      <div className={style.BuyContainer}>
        <div className={style.Detailswrapper}>
          <div className={style.title}>{ele.title}</div>
          <div className={style.Wrapper}>
            <div className={style.image}>
              <img src={ele.image}  />
            </div>
            <div className={style.Description}>
              <div className={style.detail}>
                <h1>Product Details:</h1>
                <h5>{ele.description}</h5>
              </div>
              <p>Full Details</p>
              <div className={style.Reviews}>
                <p>⭐ {ele.rating.rate}/ 5</p>
                <h3>85% People recommend to buy this product!</h3>
              </div>
            </div>
          </div>
        </div>
        <div className={style.PriceDetails}>
          <div className={style.Price}>${ele.price}</div>
          <div className={style.btn}>
            <button onClick={() => handleOrder(ele.id, 'buy')}>Buy</button>
            <button onClick={() => handleOrder(ele.id, 'rent')}>Rent</button>
          </div>
          <div className={style.Features}>
        <h2>Product Features:</h2>
        <ul>
          <li><strong>High Quality:</strong> Made with premium materials for durability and long-lasting use.</li>         
         <li><strong>Fast Charging:</strong> Fully charges in under 30 minutes with a fast-charging feature.</li>
          <li><strong>5-Year Warranty:</strong> Includes a free 5-year warranty with customer support.</li>
          <li><strong>Adjustable Settings:</strong> Customize your experience with adjustable settings.</li>
        </ul>
      </div>
          <div className={style.ShippingInfo}>
        <h2>Shipping Information:</h2>
        <ul>
          <li>Free shipping on orders over $50</li>
          <li>Ships within 2-3 business days</li>
          <li>Estimated delivery time: 5-7 business days</li>
        </ul>
      </div>
        </div>
      </div>

    </div>
         
     })}
    </> 
  );
}
