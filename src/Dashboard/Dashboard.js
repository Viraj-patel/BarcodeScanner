import React, { useState } from "react";
import "./Dashboard.css";
import logo from "../nonsenselogo.jpg";
import uparrow from "../uparrow.png";
import { Redirect } from "react-router";
import AddProduct from "../AddProducts/AddProduct";
import StockUpdater from "../StockUpdater/StockUpdater.js";

const Dashboard = () => {
  const [redirect, setRedirect] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddStockManually, setShowAddStockManually] = useState(false);
  const [showRemoveStockManually, setShowRemoveStockManually] = useState(false);
  const [redirectTo, setRedirectTo] = useState("");

  return redirect ? (
    <Redirect to={{ pathname: `/${redirectTo}` }} />
  ) : (
    <div className="container">
      <img src={logo} height="30px" alt="Nonsense" />
      <div></div>
      <div>
        <button
          className="buttonClass"
          onClick={() => {
            setShowAddProduct(!showAddProduct);
          }}
        >
          Add new Product
          {showAddProduct && (
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <img src={uparrow} height="20px" width="20px" />
            </span>
          )}
        </button>
      </div>
      {showAddProduct && <AddProduct />}
      <div>
        <button
          className="buttonClass"
          onClick={() => {
            setRedirect(true);
            setRedirectTo("scanner");
          }}
        >
          Scan Product
        </button>
      </div>
      <div>
        <button
          className="buttonClass"
          onClick={() => {
            setShowAddStockManually(!showAddStockManually);
          }}
        >
          Add stock manually
          {showAddStockManually && (
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <img src={uparrow} height="20px" width="20px" />
            </span>
          )}
        </button>
      </div>
      {showAddStockManually && <StockUpdater type={"Add"} />}
      <div>
        <button
          className="buttonClass"
          onClick={() => {
            setShowRemoveStockManually(!showRemoveStockManually);
          }}
        >
          Remove stock manually
          {showRemoveStockManually && (
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <img src={uparrow} height="20px" width="20px" />
            </span>
          )}
        </button>
      </div>
      {showRemoveStockManually && <StockUpdater type={"Remove"} />}
      <div>
        <button
          className="buttonClass"
          onClick={() => {
            setRedirect(true);
            setRedirectTo("list");
          }}
        >
          Stock details and product Barcodes
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
