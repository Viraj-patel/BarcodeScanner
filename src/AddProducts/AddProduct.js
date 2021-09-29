
import React, {useState}from "react";
import { Redirect } from 'react-router';

export default function AddProduct() {
    const [productName,setProductName]=useState(""); 
    let [redirect,setRedirect]=useState(false)
    const onInputChange = e => {
      console.log(e.target.value);
      setProductName(e.target.value)
    };


   const submitResult = async() =>
    {
        const name = productName;
        const barcode =Math.floor(100000 + Math.random() * 900000).toString();
        console.log(name,barcode);
        // document.getElementById("barcodeName").value = "";
        setRedirect(true)
        await fetch('https://non-sense-backend.herokuapp.com/addProduct',{
          method:"POST",
          headers: {
           "Content-Type": "application/json",
          },
          body:JSON.stringify({ name,barcode}), 
          }).then((res)=>{
            console.log(res,"ggg");
          })
    }  
    
   
  return (
      !redirect?(
    <div>
      <div
        className="col-sm-12"
        style={{ border: "1px solid rgb(206 200 200)" }}
      >
        <h4 style={{ color: "green" }} id="success"></h4>
        <h5 className="text-center  ml-4 mb-5 mt-4">Add Product</h5>
        <div className="form-group">
          <input
            id="barcodeName"
            type="text"
            className="form-control  mb-4"
            value={productName}
            name="productName"
            onChange={(e) => onInputChange(e)}
            placeholder="Enter Product Name"
            required=""/>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={submitResult}
          name="submit">
          Add
        </button>
      </div>
    </div>):<Redirect to={{pathname:"/list"}}/>
  );
}
