import React from 'react'
import "./Admin.css"
import SideBar from '../../components/SideBar/SideBar'
import Addproduct from '../../components/AddProduct/Addproduct'
import ListProduct from '../../components/ListProduct/ListProduct'
import { Routes,Route } from "react-router-dom"

const Admin = () => {
  return (
    <div className='admin'>
      <SideBar/>
      <Routes>
        <Route path='/addproduct' element={<Addproduct/>}/>
        <Route path='/listproduct' element={<ListProduct/>}/>
      </Routes>
    </div>
  )
}

export default Admin