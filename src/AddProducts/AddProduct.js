
import React, {useState}from "react";
import { Redirect } from 'react-router';

export default function AddProduct() {
    let [barcode,setBarcods]=useState(); 
    let [redirect,setRedirect]=useState(false)

    const onInputChange = e => {
        setBarcods(e.target.value)
    };


    const submitResult = (e) =>
    {
        // var proName = barcod.productName;
        // var proNum = barcod.productNum;
        var proNum = barcode;
        console.log(proNum);
        document.getElementById("barcodeName").value = "";
        setRedirect(true)
        // let sendReqData = barcod;
        // var response = fetch('http://localhost/react_projects/react_barcod/generate_barcode.php',{
        //   method:"POST",
        //   headers: {
        //    "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ barCodeProductName:proName, barCodeProNum:proNum }), // This will send to php 
        //   }).then(function(response){
        //    return response.json();
        //   })
        //   .then(function(myJson) 
        //   {
        //     loadBrcode();
        //   });
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
            value={barcode}
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
