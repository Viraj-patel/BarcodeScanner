import React, { useState, useEffect } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import Result from "./Result";
import { Redirect } from "react-router";
import logo from "../nonsenselogo.jpg";

var _ = require("lodash");

const BarcodeReaders = () => {
  const [scanResults, setScanResults] = useState([]);
  const [data, setData1] = useState({});
  const [showScanner, setShowScanner] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const onScan = (err, result) => {
    if (result) {
      setShowScanner(false);
      const data = _.cloneDeep(scanResults);
      data.push(result.text);
      console.log(data);
      setScanResults(data);
    }
  };
  useEffect(() => {
    fetch("https://non-sense-backend.herokuapp.com/getProduct")
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        setData1(myJson);
      });
  }, []);
  if (redirect) {
    return <Redirect to={{ pathname: `../` }} />;
  }
  return showScanner ? (
    <>
      <BarcodeScannerComponent width={500} height={500} onUpdate={onScan} />
    </>
  ) : (
    <div className="container">
      <img
        src={logo}
        height="30px"
        alt="Nonsense"
        onClick={() => {
          setRedirect(true);
        }}
      />
      <button
        onClick={() => {
          setShowScanner(true);
        }}
      >
        Scan Product
      </button>
      {!_.isEmpty(scanResults) && (
        <Result
          results={scanResults}
          data={data}
          updateResults={setScanResults}
          setRedirect={setRedirect}
        />
      )}
    </div>
  );
};

export default BarcodeReaders;
