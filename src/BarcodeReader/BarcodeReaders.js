import React, { Component } from "react";
import Scanner from "./Scanner";
import Result from "./Result";
import logo from "../nonsenselogo.jpg";
import { Redirect } from "react-router";

class BarcodeReaders extends Component {
  state = {
    scanning: false,
    redirect: false,
    redirectTo: "",
    results: [],
  };

  _scan = () => {
    this.setState({ scanning: !this.state.scanning });
  };

  _onDetected = (result) => {
    this.setState({ scanning: !this.state.scanning });
    this.setState({ results: this.state.results.concat([result]) });
  };

  render() {
    return this.state.redirect ? (
      <Redirect to={{ pathname: `../` }} />
    ) : (
      <div className="container">
        <img
          src={logo}
          height="30px"
          alt="Nonsense"
          onClick={() => {
            this.setState({ redirect: true });
          }}
        />
        <button onClick={this._scan}>Add new</button>

        <Result result={this.state.results} />

        {this.state.scanning ? <Scanner onDetected={this._onDetected} /> : null}
      </div>
    );
  }
}

export default BarcodeReaders;
