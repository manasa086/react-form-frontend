import React,{useEffect,useState} from "react";
import TableContent from '../Components/TableContent';
import {useHistory} from "react-router-dom";
import routes from "../routes";

const Editdelete=()=>{
    const [getData,setData]=useState([]);
    
    useEffect(()=>{
        fetch("https://backend-form-data.herokuapp.com/")
        .then((res)=>res.json())
        .then((data)=>setData(data.message))
        .catch(console.error);
    },[getData]);
    const history=useHistory();

    const editDataById=(data)=>{
        history.push(routes.editdeleteid.replace(":id",data.dataid));
    }
    const deleteDataById=(data)=>{

        fetch("https://backend-form-data.herokuapp.com/delete",{
            method:"DELETE",
            body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }})
        .then((res)=>res.json())
        .then((data1)=>{
            console.log(data1);})
        .catch(console.error);
        
    }
    return (
        <TableContent getData={getData} editDataById={editDataById} deleteDataById={deleteDataById}></TableContent>
      );

}

export default Editdelete