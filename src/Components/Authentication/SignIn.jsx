import React, { useState } from 'react';
import style from '../Styles/Signup.module.css'
import { Navigate, NavLink, useNavigate} from 'react-router-dom'

export default function SignIn() { 

   const navigate=useNavigate()
   const [userExist,setuserExist]=useState(false)
   
  function handlesignin(event){
     event.preventDefault();
     const formdata=new FormData(event.target)
     const data=Object.fromEntries(formdata.entries())
      
    const storedData= JSON.parse(localStorage.getItem('formdata'))
    console.log(storedData)

   const find= storedData.find((ele)=>{
       if(ele.email===data.email && ele.password===data.password){
          navigate('layout')
       }
       else{
         setuserExist(prev=>!prev)
         setTimeout(()=>{
          setuserExist(prev=>!prev)
         },3000)
       }
    })
  
  }
  return (
    <div className={style.formWrapper}>
    <h1>Welcome to Style Aura </h1>
    <p> The Leading Product Selling Website</p>

    <form className={style.form} onSubmit={handlesignin}>
        <h1 className={style.formTitle}>SignIn To Get Started</h1>
         <div className={style.username}>
           <label>Email</label>
           <input type='email' required name='email'/>
         </div>
         <div className={style.password}>
           <label>Password</label>
           <input type='password' required name='password' />
         </div>
         <div className={style.formbtn}>
         <button className={style.signin} type='submit' >Sign In</button>
         </div>
         <h6>If U dont have account.Please create one Before Sign in </h6>
      <NavLink to={'createaccount'} className={style.create}>Create New Account ?</NavLink>
    </form> 
     { userExist && <p>! Please Enter only Valid credentials</p>}
  </div> 

  )
}
