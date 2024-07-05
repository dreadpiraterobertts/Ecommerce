import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import {Routes,Route} from 'react-router-dom'
import AddProduct from '../../Components/AddProduct/AddProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'
import Orders from '../../Components/Orders/Orders'
import AddBanner from '../../Components/AddBanner/AddBanner'
const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
        <Route path='/addproduct' element= {<AddProduct/>}/>
        <Route path='/addbanner' element= {<AddBanner/>}/>
        <Route path='/listproduct' element= {<ListProduct/>}/>
        <Route path='/orders' element= {<Orders/>}/>
      </Routes>
    </div>
  )
}

export default Admin
