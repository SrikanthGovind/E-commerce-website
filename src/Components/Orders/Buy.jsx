import React from "react";
import style from "../Styles/Buy.module.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { HiChevronDoubleRight } from "react-icons/hi";
import { buyActions } from "../Redux";
import { orderActions } from "../Redux";
import { useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";


export default function Buy() {
  const productsdata = useSelector((state) => state.buy.items);
  const quantity = useSelector((state) => state.buy.quantity);
  const orderconfirm=useSelector((state)=>state.buy.orderconfirm)
  const dispatch=useDispatch();
  const navigate=useNavigate();

  function handlequantity(type){
      dispatch(buyActions.handleQuantity(type))
  }

  useEffect(()=>{
    dispatch(buyActions.initialQuantity())
  },[])

  function handleconfirm(data,type,Quantity){

       dispatch(buyActions.handleconfirmBuy())
       dispatch(orderActions.handleorders({data,type,Quantity}))

       setTimeout(()=>{
       dispatch(buyActions.handleconfirmBuy())
       },2000)

  }
  function handleBackClick() {
    navigate(-1); 
}

  let data = [...productsdata];

  return (
    <>
      {data.length === 0 ? (
        <div className={style.Emptymessage}>
          <h1>Click below to Buy Products </h1>
          <NavLink to="/layout/products">
            Go TO Products <HiChevronDoubleRight />{" "}
          </NavLink>
        </div>
      ) : (
        <>
              <div className={style.backButton} onClick={handleBackClick}>
                <IoMdArrowBack />Back
              </div>
          <div className={style.BuyContainer}>
            <div className={style.Detailswrapper}>
              <div className={style.title}>{data[0].title}</div>
              <div className={style.Wrapper}>
                <div className={style.image}>
                  <img src={data[0].image} />
                </div>
                <div className={style.Description}>
                  <div className={style.detail}>
                    <h1>Product Details:</h1>
                    <h5> {data[0].description}</h5>
                  </div>
                  <p>Full Details </p>
                  <div className={style.Reviews}>
                    <p>⭐ {data[0].rating.rate} / 5</p>
                    <div className={style.Price}>Price : ${data[0].price }</div>

                    <h3> 84% People recommend to buy this product!! </h3>
                  </div>

                </div>
              </div>
            </div>
            <div className={style.PriceDetails}>
              <div className={style.Totalprice}>
                <h3 className={style.head}>TotalPrice : </h3>
                <h3 className={style.head}>$ {data[0].price * quantity}</h3>
              </div>

              <div className={style.quantity}>
                <button onClick={()=>handlequantity('decrease')}>-</button>
                <button>{quantity}</button>
                <button onClick={()=>handlequantity('increase')}>+</button>
              </div>
              <div className={style.btn}>
               <button onClick={()=>handleconfirm(data[0],'buy',quantity)}>Confirm Buy Product</button>
               </div>
              </div>
          </div>
         {orderconfirm && <div className={style.confirmation}>Order PLaced successfully!</div>}

        </>
      )}
    </>
  );
}
