import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect ,useParams, useRef} from "react";
import { useBarcode } from '@createnextapp/react-barcode';
 
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

  const GetBarCode=(value)=>{
    const { inputRef } = useBarcode({
        value, //Product Number from database 
        options: {
          background: '#ffffff',
          fontSize: 20,
          margin: 30,
          fontOptions: "bold",
          width: 1,
          height:70
        }
      });
      return inputRef
  }

function Barcode()
 
{
    const [barcod,setBarcod] = useState({
      productName:'',
      productNumber:''
    });
    const svgRef=useRef({});
    const [getbarcode,setGetbarcode] = useState([]);
   
    const { productName, productNumber} = barcod; // Array Destructutring
 
   
    const dummyBEData = [
        {
            name:'cards',
            barcode:'1234cards',

        },
        {
            name:'apple',
            barcode:'1234apple',

        },
        {
            name:'sam',
            barcode:'1234sam',

        },
        {
            name:'hii',
            barcode:'1234hii',

        },
        


    ]
   // Handling Input values here 
 

  
   // Code for fetching Barcode Number from database  on window load
    // const  loadBrcode =()=>
    // {
    //   var response = fetch('http://localhost/react_projects/react_barcod/load_barcode.php')
    //   .then(function(response){
    //        return response.json();
    //     })
    //   .then(function(myJson) 
    //     {
    //     setGetbarcode(myJson);
    //     });
    // }
 
    // useEffect(() => {
    //   loadBrcode();
    // }, []);
 
   
     
    // Code for Inserting barcode into database
    

    const downloadSVG =(i)=> {
        const svg = svgRef.current[i].innerHTML
        const blob = new Blob([svg], { type: "image/svg+xml" });
        downloadBlob(blob, `${i}.svg`);
      }
    
  return(
   
    <div className="container">
      <div className="row">  
          
      <div className="col-sm-12" style={{border:"1px solid rgb(206 200 200)"}}>
      <h5 className="text-center  ml-4 mb-5 mt-4">Barcodes</h5>
         <table className="table table-hover mb-5">
         <thead>
          <tr>
            <th>Id</th>
            <th>Product Name</th>
            <th>Barcode Number</th>
            <th>Download</th>
          </tr> 
        </thead>
        <tbody id="output">

            {dummyBEData.map((m,i)=>{
                return <tr>
                <td>{i}</td>
                <td><h5>{m.name}</h5></td>
                <td ref={(ref,key)=>{
                    svgRef.current[m.name]=ref
                }}><svg ref={GetBarCode(m.barcode) }/></td>
                <td><button type="submit" className="btn btn-primary" onClick={()=>{downloadSVG(m.name)}}name="submit">Download</button></td>
              </tr>   
            })

            }
        </tbody>
        </table>
     
        </div>
      </div>
    </div>    
  
 
  );
}
 
export default Barcode;
