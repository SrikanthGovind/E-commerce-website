import React from 'react'
import style from '../Styles/Signup.module.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateAccount() {

  const [PasswordExist,setPasswordExist]=useState(false)
  const navigate=useNavigate()

  function handleCreateacc(event){
    event.preventDefault();
    const formdata=new FormData(event.target)
    const data=Object.fromEntries(formdata.entries())
    console.log(data)

    if(data.password !== data.confirmpassword ){
      setPasswordExist(prev=>!prev)
      setTimeout(()=>{
       setPasswordExist(prev=>!prev)
      },3000)
      return;
    }

    let usersArray = JSON.parse(localStorage.getItem('formdata')) || [];
    usersArray.push(data);
    localStorage.setItem('formdata', JSON.stringify(usersArray))
    navigate('/')
  }

  return (
        <div className={style.formWrapper}>
        <h1>Welcome tO  Style Aura</h1>
        <p> The Leading Product Selling Website</p>
<form className={style.form} onSubmit={handleCreateacc} >
    <h1 className={style.formTitle}>Create Account in <span className={style.bloob}>Blo0b</span></h1>
    <div className={style.username}>
       <label>Full Name</label>
       <input required type='text' name='fullname'/>
     </div>
       <div className={style.username}>
       <label>Email</label>
       <input required  type='email' name='email'/>
     </div>
     <div className={style.password}>
       <label>Password</label>
       <input required type='password' name='password' />
     </div>
     <div className={style.username}>
       <label>Confirm Password</label>
       <input required type='password' name='confirmpassword'/>
     </div>
     <div className={style.formbtn}>
     <button className={style.signin}>Create Account</button>
     </div>
</form>
     { PasswordExist && <p>! Password and Confirm Password does not match</p>}
</div>
  )
}
