import React from 'react'
import { BrowserRouter, Route } from "react-router-dom";
import Barcode from './Barcode/Barcode';
import AddProduct from './AddProducts/AddProduct';
import BarcodeReaders from './BarcodeReader/BarcodeReaders'


export default function Routing() {
    return (
        <div>
              <BrowserRouter>
          <switch>
            <Route path="/" exact component={AddProduct} />
            <Route path="/list" component={Barcode} />
            <Route path="/scanner" component={BarcodeReaders}/>
          </switch>
        </BrowserRouter>
        </div>
    )
}
