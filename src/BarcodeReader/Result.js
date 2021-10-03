import React, { Component } from "react";

const getResultWithQuantity = (value) => {
  const result = {};
  value.map((val) => {
    result[val.codeResult.code] = result[val.codeResult.code]
      ? result[val.codeResult.code]++
      : 1;
  });
  return result;
};

class Result extends Component {
  render() {
    const result = getResultWithQuantity(this.props.result);

    if (!result) {
      return null;
    }

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
