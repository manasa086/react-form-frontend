import React,{useState,useEffect, Fragment} from "react";
import { Table } from 'reactstrap';
import "../App.css";

const TableContent=(props)=>{

    
    if(props.getData.length>0)
    {
    return(
        
            <div ClassName="container table">
                <Table responsive>
                    <thead>
            <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Address Line 1</th>
          <th>Address Line 2</th>
          <th>Country</th>
          <th>State</th>
          <th>City</th>
          <th>Gender</th>
          <th>Martial Status</th>
          <th>Food</th>
          <th>Color</th>
          <th>Edit</th>
          <th>Delete</th>
          
        </tr>
      </thead>
                    <tbody>
                {props.getData.map((data,index)=>{
                    const editData=(data)=>{
                        props.editDataById(data);
                    }
                    const deleteData=(data)=>{
                        props.deleteDataById(data);
                    }
                    return (<Fragment>
                        <td>{index+1}</td>
                        <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.address}</td>
                    <td>{data.address2}</td>
                    <td>{data.country}</td>
                    <td>{data.state}</td>
                    <td>{data.city}</td>
                    <td>{data.gender}</td>
                    <td>{data.martialstatus}</td>
                    <td>{data.food}</td>
                    <td>{data.color}</td>
                    <td><button onClick={()=>editData(data)} className="btn btn-secondary">Edit</button></td>
                    <td><button onClick={()=>deleteData(data)} className="btn btn-secondary">Delete</button></td>
                    <tr></tr>
                        </Fragment>
                    )
                
                })}
                </tbody>
                </Table>
                </div> 
     

        
    )
    }
    else
    {
        return null;
    }


}

export default TableContent;