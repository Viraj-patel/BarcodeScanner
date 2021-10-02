import React, { useState } from "react";
import { Redirect } from "react-router";
import "./AddProduct.css";

export default function AddProduct() {
  const [productName, setProductName] = useState("");
  let [redirect, setRedirect] = useState(false);
  const onInputChange = (e) => {
    console.log(e.target.value);
    setProductName(e.target.value);
  };

  const submitResult = async () => {
    const name = productName;
    const barcode = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(name, barcode);
    // document.getElementById("barcodeName").value = "";
    setRedirect(true);
    await fetch("https://non-sense-backend.herokuapp.com/addProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, barcode }),
    }).then((res) => {
      console.log(res, "ggg");
    });
  };

  return !redirect ? (
    <div className="inputcontainer">
      <div>
        <input
          id="barcodeName"
          className="inputBox"
          type="text"
          value={productName}
          name="productName"
          onChange={(e) => onInputChange(e)}
          placeholder="Enter Product Name"
          required=""
        />
      </div>
      <button
        type="submit"
        onClick={submitResult}
        name="submit"
        className="buttonClassProduct"
      >
        Add
      </button>
    </div>
  ) : (
    <Redirect to={{ pathname: "/list" }} />
  );
}
