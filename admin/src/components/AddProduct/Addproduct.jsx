import React from "react";
import "./AddProduct.css";
import uploadimg from "../../assets/upload_area.svg";
import { useState } from "react";

const Addproduct = () => {
  const [image, setimage] = useState(false);
  const [productDetails, setproductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });

  const imageHandler = (e) => {
    setimage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    console.log(e);
    setproductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let responseData;
    let product = productDetails;
    let formData = new FormData();
    formData.append("product", image);
    await fetch("http://localhost:5000/upload/", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => (responseData = data));
    if (responseData.success) {
      product.image = responseData.image_url;
      await fetch("http://localhost:5000/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success?alert("Product added successfully"):alert("Failed");
        });
    }
  };

  return (
    <div className="addproduct">
      <div className="addproduct-item-field">
        <p>Product Title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type Here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-item-field">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type Here"
          />
        </div>
        <div className="addproduct-item-field">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Type Here"
          />
        </div>
      </div>
      <div className="addproduct-item-field">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="addproduct-selector"
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kids">Kids</option>
        </select>
      </div>
      <div className="addproduct-item-field">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : uploadimg}
            alt=""
            className="uploadimg"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button onClick={submitHandler} className="addproduct-button">
        Add Product
      </button>
    </div>
  );
};

export default Addproduct;
