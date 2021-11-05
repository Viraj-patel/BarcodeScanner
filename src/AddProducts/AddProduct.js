import React, { useState } from "react";
import { Redirect } from "react-router";
import "./AddProduct.css";

export default function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState("");

  let [redirect, setRedirect] = useState(false);

  const onInputChange = (e) => {
    setProductName(e.target.value);
  };

  const onIdChange = (e) => {
    setProductId(e.target.value);
  };

  const submitResult = async () => {
    const name = productName;
    const barcode = productId;

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
      <div className="inputs">
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
        <input
          id="barcode"
          className="inputBox"
          type="text"
          value={productId}
          name="productId"
          onChange={(e) => onIdChange(e)}
          placeholder="Enter Product Id"
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
