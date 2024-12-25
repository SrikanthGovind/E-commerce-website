import React, { useEffect, useState } from "react";
import style from "../Styles/Rent.module.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { HiChevronDoubleRight } from "react-icons/hi";
import { rentActions } from "../Redux";
import { orderActions } from "../Redux";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function Rent() {
  const productsdata = useSelector((state) => state.rent.items);
  const orderconfirm = useSelector((state) => state.rent.orderconfirm);
  const startdate = useSelector((state) => state.rent.startdate);
  const enddate = useSelector((state) => state.rent.enddate);
  const [Dates,setDate]=useState('');
  const [checked,setchecked]=useState(false);
  const [isvalid,setisvalid]=useState(false)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  let data = [...productsdata];


    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toLocaleDateString("en-CA"); 
  
    useEffect(() => {
      setDate(formattedCurrentDate);
    }, []);

   
    let calculatedDate = 0;
    if (startdate && enddate) {
      const diffTime = enddate - startdate;
      if (diffTime > 0) {
        calculatedDate = Math.ceil(diffTime / (1000 * 3600 * 24)+1);  
      } else {
        calculatedDate = 0;      
      }
    } 

  function handleconfirm(data,type){
      dispatch(rentActions.handleconfirmRent())
      dispatch(orderActions.handleorders({data,type}))
      setTimeout(()=>{
      dispatch(rentActions.handleconfirmRent())
      },2000)

  }
  function handlechange(event,type){  
        let date=event.target.value
         const Dateobject=new Date(date)
         dispatch(rentActions.setDate({type,Dateobject}))
  }

  function handlecheck(){
     setchecked(prev=>!prev)
  }
  function handleBackClick() {
    navigate(-1); 
}
  
  return (
    <div>
      {data.length === 0 ? (
        <div className={style.Emptymessage}>
          <h1>Click below to Rent Products </h1>
          <NavLink to="/layout/products">
            Go TO Products <HiChevronDoubleRight />{" "}
          </NavLink>
        </div>
      ) : (
        <>
        <div className={style.backButton} onClick={handleBackClick}>
                <IoMdArrowBack />Back
           </div>
          <div className={style.RentalContainer}>

            <div className={style.DetailsWrapper}>
              <div className={style.Title}>Rent {data[0].title}</div>
              <div className={style.ProductWrapper}>
                <div className={style.Image}>
                  <img src={data[0].image} alt="product" />
                </div>
                <div className={style.Description}>
                  <div className={style.Detail}>
                    <h1>Product Details:</h1>
                    <p>{data[0].description}</p>
                  </div>
                  <div className={style.Reviews}>
                    <p>⭐ {data[0].rating.rate} / 5</p>
                  </div>
                  <div className={style.RentalPrice}>
                  Rental Charge : 
                <span className={style.Price}> $100 </span>
                <span className={style.PerDay}>/ day</span>
              </div>

                  <div className={style.rentalPeriod}>
                    <h1>Rental Period</h1>
                    <label>Start Date</label>
                    <input type="date" 
                     onChange={(event)=>handlechange(event,'start')} 
                     defaultValue={startdate ? startdate.toLocaleDateString('en-CA') : ''}
                     min={formattedCurrentDate}
                     />
                    <label>Return Date</label>
                    <input type="date" 
                     onChange={(event)=>handlechange(event,'end')} 
                     defaultValue={enddate ? enddate.toLocaleDateString('en-CA') : ''}
                     min={ formattedCurrentDate} 
                     />
                  </div>
                  <div className={style.rentalCharges}>
                    <p>Rental Days:  <span>{calculatedDate}</span></p>
                    <p>Charges for selected days: <span>$ {calculatedDate * 100}</span></p>
                  </div>
                </div>
              </div>
            </div>

            <div className={style.PriceDetails}>

              <div className={style.costlist}>
                <h1>Price range:</h1>
                <ul className={style.duration}>
                  <li>
                    <span>3 Hours</span> <span>$20</span>
                  </li>
                  <li>
                    <span>1 Day</span> <span>$100</span>{" "}
                  </li>
                  <li>
                    <span>1 Week</span> <span>$1000</span>
                  </li>
                  <li>
                    <span>1 Month</span> <span>$5000</span>
                  </li>
                </ul>
              </div>

              <div className={style.Terms}>
                <h3>Terms & Conditions</h3>
                <li>30 Days money back garunteed</li>
                <li>Shipping 2-3 business days</li>
                <li>Payment not Refundable</li>

                <div className={style.agree}>
                  <input type="checkbox" className={style.QuantityInput} checked={checked} onChange={handlecheck} />
                  <p>I agree to all the Terms and Conditions</p>
                </div>
              </div>
              <div className={style.RentButton}>
                <button onClick={()=>handleconfirm(data[0],'rent')} disabled={!checked}>Confirm Rent</button>
              </div>
            </div>
          </div>

         {orderconfirm && <div className={style.confirmation}>
            Your product Will be Delivered Soon!
          </div> }
          {isvalid && <div className={style.confirmation}>
              Please enter valid date!
          </div> }
        </>
      )}
    </div>
  );
}
