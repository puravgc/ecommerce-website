import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png"

const ListProduct = () => {
  const [allProducts, setallProducts] = useState([]);
  const fetchInfo = async () => {
    await fetch("http://localhost:5000/allproducts")
      .then((res) => res.json())
      .then((data) => {
        setallProducts(data);
      });
  };


  const handleDelete = async (id) => {
    await fetch("http://localhost:5000/removeproduct",{
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id:id}),
    })
    await fetchInfo()
  };
useEffect(() => {
 fetchInfo()
  
}, [])



  return (
    <div className="list-product">
      <h1>All Products</h1>
      <div className="list-product-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="list-product-all-products">
        <hr />
       {allProducts.map((item,i)=>{
        return(
        <>
          <div key={i} className="list-product-format-main list-product-format">
            <img className="list-product-product-icon" src={item.image} alt="" />
            <p>{item.name}</p>
            <p>${item.old_price}</p>
            <p>${item.new_price}</p>
            <p>{item.category}</p>
            <img onClick={()=>handleDelete(item.id)} className="list-Product-remove-icon" src={cross_icon} alt="" />
          </div>
        <hr/>
        </>
        )
       })}
       
      </div>
    </div>
  );
};

export default ListProduct;
