import React from 'react'
import Aside from './Aside';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import style from './Styles/Layout.module.css'

export default function Layout() {
  return (
    <>
    <div className={style.Layout}>
          <Header />   
          <Aside />
          <div className={style.outlet}>
          <Outlet/>
          </div>
    </div>
    </>
  )
}
