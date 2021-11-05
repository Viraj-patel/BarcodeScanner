import React, { Component } from "react";

const getResultWithQuantity = (value, data) => {
  const result = {};
  value.map((val) => {
    result[val.codeResult.code] = 0;
  });
  value.map((val) => {
    console.log(val, result);
    result[val.codeResult.code] = result[val.codeResult.code] + 1;
  });
  const dataval = {};
  Object.keys(result).map(function (key, index) {
    const datakey = data.find((d) => d.barcode == key);
    dataval[datakey.name] = result[key];
  });
  return 0;
};

class Result extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const result = getResultWithQuantity(this.props.results, this.props.data);
    // console.log(this.props.results);
    if (!result) {
      return null;
    }
    console.log(result);
    return (
      <table>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>remove</th>
        </tr>
        {Object.keys(result).map(function (key, index) {
          return (
            <tr>
              <td>{key}</td>
              <td>{result[key]}</td>
              <td>Remove</td>
            </tr>
          );
        })}
      </table>
    );
  }
}

export default Result;
