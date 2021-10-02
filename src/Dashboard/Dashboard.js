import React from "react";
import "./Dashboard.css";
import logo from "../nonsenselogo.jpg";

const Dashboard = () => {
  return (
    <div className="container">
      <img src={logo} height="30px" alt="Nonsense" />
      <div></div>
      <div>
        <button className="buttonClass">Add new Product</button>
      </div>
      <div>
        <button className="buttonClass">Add product in Stock</button>
      </div>
      <div>
        <button className="buttonClass">Remove Product from stock</button>
      </div>
      <div>
        <button className="buttonClass">Add Stock Manually</button>
      </div>
      <div>
        <button className="buttonClass">Remove Stock Manually</button>
      </div>
      <div>
        <button className="buttonClass">
          Stock details and product Barcodes
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
