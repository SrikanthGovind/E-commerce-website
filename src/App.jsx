import './App.css'
import { Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
 import Orders from './Components/Orders/Orders';
 import Products from './Components/Products/Products';
import Companies from './Components/Company/Companies';
import Carts from './Components/Cart/Carts';
import Buy from './Components/Orders/Buy';
import Rent from './Components/Orders/Rent';
import Signup from './Components/Authentication/Signup';
import CreateAccount from './Components/Authentication/CreateAccount';
import SignIn from './Components/Authentication/SignIn';
import Productdetails from './Components/Products/Productdetails';

function App() {
  // https://www.odoo.com/
  // https://gearflow.com/parts-hub
  // https://www.rentomojo.com/bangalore
  // https://99designs.com/profiles/fenixo/designs/906151

  return (
    <>
      <Routes>       
         <Route path='/' element={<Signup/>}>
            <Route index element={<SignIn/>}></Route>
            <Route path='createaccount' element={<CreateAccount/>}></Route>
            <Route path='layout' element={<Layout/>}>
                <Route index element={<Companies/>}></Route>
                <Route path='products' element={<Products/>}></Route>
                <Route path='products/:id' element={<Productdetails/>}></Route>
                <Route path='orders' element={<Orders/>}></Route>
                <Route path='buy' element={<Buy/>}></Route>
                <Route path='rent' element={<Rent/>}></Route>
                <Route path='cart' element={<Carts/>}></Route>
         </Route>
         </Route>
      </Routes>
   
    </>
  )


}

export default App
