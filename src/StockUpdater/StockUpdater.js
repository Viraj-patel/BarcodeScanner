import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import "./StockUpdater.css";
import Select from "react-select";
var _ = require("lodash");

export default function StockUpdater({ type }) {
  const [quantity, setQuantity] = useState("");
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  let [redirect, setRedirect] = useState(false);

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = () => {
    var response = fetch("https://non-sense-backend.herokuapp.com/getProduct")
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setData(myJson);
      });
  };

  const onQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const getOptions = () => {
    return data.map((option) => {
      return {
        label: option.name,
        value: option.barcode,
      };
    });
  };

  const submitResult = async () => {
    const barcode = selectedOption.value;

    const oldQuantity = Number(
      _.get(
        _.find(data, (option) => {
          console.log(option, selectedOption);
          return option.barcode == barcode;
        }),
        "quantity",
        ""
      )
    );
    const updatedQuantity =
      type == "Add"
        ? oldQuantity + Number(quantity)
        : oldQuantity - Number(quantity);
    console.log(barcode, updatedQuantity);

    // // document.getElementById("barcodeName").value = "";
    // setRedirect(true);
    await fetch("https://non-sense-backend.herokuapp.com/updateQuantity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: updatedQuantity, barcode }),
    }).then((res) => {
      console.log(res, "ggg");
    });

    setSelectedOption("");
    setQuantity("");
    getProductDetails();
  };

  return !redirect ? (
    <div className="inputcontainer">
      <div className="inputs">
        <Select
          options={getOptions()}
          value={selectedOption}
          onChange={(val) => setSelectedOption(val)}
          name="product"
          placeholder="Select Product"
        />
        <input
          id="quantity"
          className="inputBox"
          type="number"
          value={quantity}
          name="quantity"
          onChange={(e) => onQuantityChange(e)}
          placeholder="Enter quantity"
          required=""
        />
      </div>
      <button
        type="submit"
        onClick={submitResult}
        name="submit"
        className="buttonClassProduct"
      >
        {type}
      </button>
    </div>
  ) : (
    <Redirect to={{ pathname: "/list" }} />
  );
}
