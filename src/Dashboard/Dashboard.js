import React, { useState } from "react";
import "./Dashboard.css";
import logo from "../nonsenselogo.jpg";
import uparrow from "../uparrow.png";
import { Redirect } from "react-router";
import AddProduct from "../AddProducts/AddProduct";

const Dashboard = () => {
  const [redirect, setRedirect] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
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
            setRedirectTo("add");
          }}
        >
          Add product in Stock
        </button>
      </div>
      <div>
        <button
          className="buttonClass"
          onClick={() => {
            setRedirect(true);
            setRedirectTo("remove");
          }}
        >
          Remove Product from stock
        </button>
      </div>
      <div>
        <button
          className="buttonClass"
          onClick={() => {
            setRedirect(true);
            setRedirectTo("addmanually");
          }}
        >
          Add Stock Manually
        </button>
      </div>
      <div>
        <button
          className="buttonClass"
          onClick={() => {
            setRedirect(true);
            setRedirectTo("removeManually");
          }}
        >
          Remove Stock Manually
        </button>
      </div>
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
