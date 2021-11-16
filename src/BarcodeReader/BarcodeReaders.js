// import React, { Component } from "react";
// import Scanner from "./Scanner";
import logo from "../nonsenselogo.jpg";

// import BarcodeReader from "react-barcode-reader";
// class BarcodeReaders extends Component {
//   state = {
//     scanning: false,
//     redirect: false,
//     redirectTo: "",
//     results: [],
//     data: [],
//   };
//   constructor(props) {
//     super(props);
//     this.state = {
//       result: "No result",
//     };

//     this.handleScan = this.handleScan.bind(this);
//   }
//   componentDidMount() {
//     this.loadBrcode();
//   }

//   loadBrcode = () => {
//     var response = fetch("https://non-sense-backend.herokuapp.com/getProduct")
//       .then((response) => {
//         return response.json();
//       })
//       .then((myJson) => {
//         this.setState({ data: myJson });
//       });
//   };

//   // _scan = () => {
//   //   this.setState({ scanning: !this.state.scanning });
//   // };

//   _onDetected = (scanResult) => {
//     console.log(scanResult, _.get(scanResult, "codeResult.code", ""));
//     this.setState({ scanning: !this.state.scanning });
//     this.setState({
//       results: this.state.results.concat([scanResult]),
//     });
//   };
//   handleScan(data) {
//     this.setState({
//       result: data,
//     });
//   }
//   handleError(err) {
//     console.error(err);
//   }
//   render() {
//     console.log(this.state.results);
//     return this.state.redirect ? (
//       <Redirect to={{ pathname: `../` }} />
//     ) : (
//       <div className="container">
//         <img
//           src={logo}
//           height="30px"
//           alt="Nonsense"
//           onClick={() => {
//             this.setState({ redirect: true });
//           }}
//         />
//         <button onClick={this._scan}>Add new</button>

//         {/* <Result results={this.state.results} data={this.state.data} /> */}
//         <BarcodeReader onError={this.handleError} onScan={this.handleScan} />
//         <p>{this.state.result}</p>
//         {/* {this.state.scanning ? <Scanner onDetected={this._onDetected} /> : null} */}
//       </div>
//     );
//   }
// }

import React, { useState, useEffect } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import Result from "./Result";
import { Redirect } from "react-router";
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
