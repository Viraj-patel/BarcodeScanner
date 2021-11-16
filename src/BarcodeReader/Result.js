import React, { Component } from "react";
var _ = require("lodash");
const getResultWithQuantity = (value, data) => {
  const result = {};
  value.map((val) => {
    result[val] = 0;
  });

  value.map((val) => {
    result[val] = result[val] + 1;
  });
  const dataval = {};
  Object.keys(result).map(function (key, index) {
    const datakey = data.find((d) => d.barcode == key);
    dataval[datakey?.name] = { quantity: result[key], id: key };
  });
  return dataval;
};

const Result = (props) => {
  const result = getResultWithQuantity(props.results, props.data);
  const submitResult = async ({ type }) => {
    Object.keys(result).map(async (key, index) => {
      const barcode = result[key].id;
      const oldQuantity = Number(
        _.get(
          _.find(props.data, (option) => {
            return option.barcode == barcode;
          }),
          "quantity",
          ""
        )
      );
      const updatedQuantity =
        type == "Add"
          ? oldQuantity + Number(result[key].quantity)
          : oldQuantity - Number(result[key].quantity);

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

      props.setRedirect(true);
    });
  };
  if (!result) {
    return null;
  }
  return (
    <table className="table mb-5" style={{ color: "white" }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>remove</th>
        </tr>
      </thead>
      {Object.keys(result).map(function (key, index) {
        return (
          <tr>
            <td>{key}</td>
            <td>{result[key].quantity}</td>
            <td>
              <button
                onClick={() =>
                  props.updateResults(
                    _.filter(props.results, (r) => r != result[key].id)
                  )
                }
              >
                Remove
              </button>
            </td>
          </tr>
        );
      })}
      <tr>
        <td>
          <button
            onClick={() => {
              submitResult({ type: "Add" });
            }}
          >
            Add to stock
          </button>
        </td>
        <td>
          <button
            onClick={() => {
              submitResult({ type: "Remove" });
            }}
          >
            Remove from stock
          </button>
        </td>
      </tr>
    </table>
  );
};

export default Result;
