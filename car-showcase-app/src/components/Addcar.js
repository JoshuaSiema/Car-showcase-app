import React, { useState } from "react"
import "./Addcar.css"
const Addcar = ()=>{

    const [brand,setBrand]=useState("");
    const [model,setModel]=useState("");
    const [isAvailable,setIsAvailable]=useState(true);
    
    const Add=()=>{
        console.log (brand,model,isAvailable)
        let formData=new FormData();
        formData.append("brand","brand");
        formData.append("model","model");
        formData.append("isAvailable","isAvailable");
        let body=JSON.stringify(
            {model:model,brand:brand,
                isAvailable:isAvailable
            }
        )
        fetch("http://127.0.0.1:8000/cars/",
            {method:"POST",
                body:body
            })
        .then(req=>req.json())
        .then(response=>{
            console.log(response);
        })
        .catch(e=>{
            console.log(e);
        })    
    }


    return (<div className="First" style={{
        

    }}>
        <label>Model</label>
        <input type="text" placeholder="Brand" onChange={(e)=>setBrand(e.target.value)}></input>
        <label>Brand</label>
        <input type="text" placeholder="Model" onChange={(e)=>setModel(e.target.value)}></input>
        <label>Is Available</label>
        <input type="checkbox" checked={isAvailable} onChange={(e)=>setIsAvailable(!isAvailable)}></input>
        <button onClick={Add}>add</button>

    </div>)
}

export default Addcar;