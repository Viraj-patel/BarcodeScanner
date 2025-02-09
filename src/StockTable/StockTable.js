import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useRef } from "react";
import "./StockTable.css";
import { Redirect } from "react-router";
import logo from "../nonsenselogo.jpg";

var Barcode = require("react-barcode");

function downloadBlob(blob, filename) {
  const objectUrl = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => URL.revokeObjectURL(objectUrl), 5000);
}

const StockTable = () => {
  const svgRef = useRef({});
  const [redirect, setRedirect] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    loadBrcode();
  }, []);

  const loadBrcode = () => {
    var response = fetch("https://non-sense-backend.herokuapp.com/getProduct")
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setData(myJson);
      });
  };

  // Code for Inserting barcode into database

  const downloadSVG = (i) => {
    const svg = svgRef.current[i].innerHTML;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    downloadBlob(blob, `${i}.svg`);
  };

  return redirect ? (
    <Redirect to={{ pathname: `../` }} />
  ) : (
    <div className="containers">
      <img
        src={logo}
        height="30px"
        alt="Nonsense"
        onClick={() => {
          setRedirect({ redirect: true });
        }}
      />
      <div className="row">
        <div
          className="col-sm-12"
          style={{ border: "1px solid rgb(206 200 200)" }}
        >
          <h5
            className="text-center  ml-4 mb-5 mt-4"
            style={{ color: "white" }}
          >
            Product Details
          </h5>
          <table className="table mb-5" style={{ color: "white" }}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Product Name</th>
                <th>Barcode Number</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody id="output">
              {data.map((m, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td>
                      <h5>{m.name}</h5>
                    </td>
                    <td
                      ref={(ref, key) => {
                        svgRef.current[m.name] = ref;
                      }}
                      onClick={() => {
                        downloadSVG(m.name);
                      }}
                    >
                      <Barcode value={m.barcode} />
                    </td>
                    <td>{m.quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockTable;
