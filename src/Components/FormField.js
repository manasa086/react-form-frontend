import React,{useState} from 'react';
import csc from 'country-state-city';
import { useForm } from 'react-hook-form';
import { Col, Row, Button, Form, FormGroup, Label, input } from 'reactstrap';
import "../App.css";
const FormField=()=>{
    const { register, handleSubmit,errors } = useForm();

    const [resultdata,setResultData]=useState("");

    const onSubmit=(data)=>{
      var countryname=csc.getCountryById(data.country);
        data.country=countryname.name
        var statename=csc.getStateById(data.state);
        data.state=statename.name;
        var cityname=csc.getCityById(data.city);
        data.city=cityname.name;
        console.log(data)
        fetch("https://backend-form-data.herokuapp.com/", {method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }})
        .then((res)=>res.json())
        .then((data1)=>{
          if(data1.message==="data inserted")
          {
              setResultData("Data Successfully Inserted");
          }
        })
  }
    
    let countries=csc.getAllCountries();
    let [countryData,setCountryData]=useState(countries)
    let [stateData,setStateData]=useState([]);
    let [cityData,setCityData]=useState([]);
    const changeState=(event)=>{
      setStateData(csc.getStatesOfCountry(event.target.value));
  
    }
    const changeCity=(event)=>{
      console.log(event.target.value);
      setCityData(csc.getCitiesOfState(event.target.value));
    }

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
        {/* <input type="text" name="name" ref={register({ required: true })}></input>
        <input type="email" name="age" ref={register({ required: true })}></input>
        <button type="submit">Submit</button> */}
        <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="name">Name</Label>
            <input className="form-control" type="text" name="name" id="name" ref={register({ required: true })} placeholder="Name" />
            {errors.name && "Name is required"}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="email">Email</Label>
            <input  className="form-control" type="email" name="email" id="email" ref={register({ required: true })} placeholder="Email" />
            {errors.email && "Email is required"}
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label for="address">Address Line 1</Label>
        <input className="form-control" type="text" name="address" id="address"  ref={register({ required: true })} placeholder="Address Line1"/>
        {errors.address && "Address Line1 is required"}
      </FormGroup>
      <FormGroup>
        <Label for="address2">Address Line 2</Label>
        <input className="form-control" type="text" name="address2" id="address2"  ref={register({ required: true })} placeholder="Address Line2"/>
     {errors.address2 && "Address Line2 is required"}
      </FormGroup>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="country">Country</Label>
        <select  className="form-control" ref={register({ required: true })} name="country" id="country" onChange={changeState}><option key="1" value="default">--Select--</option>
    {countryData.map((each,index)=>{
      return <option key={index} value={each.id}>{each.name}</option> ;
  })}</select>
            {errors.country && "Country is required"}
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="state">State</Label>
            <select  className="form-control" type="text"  ref={register({ required: true })} name="state" id="state" onChange={changeCity}><option key="1" value="default">--Select--</option>
    {stateData.map((each,index)=>{
      return <option key={index} value={each.id}>{each.name}</option> ;
  })}</select>
            {errors.state && "State is required"}
          </FormGroup>
          
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label for="city">City</Label>
            <select className="form-control" type="text" ref={register({ required: true })} name="city" id="city"><option key="1" value="default">--Select--</option>
    {cityData.map((each,index)=>{
      return <option key={index} value={each.id}>{each.name}</option> ;
  })}</select>
      
          </FormGroup>  
          
        </Col>
        <Col md={2}>
        <FormGroup tag="fieldset">
        <Label for="gender">Gender</Label>
        <FormGroup check>
        
          <Label check>
            <input type="radio" className="form-check-input" id="male" name="gender" ref={register({ required: true })} value="Male" />{' '}
            Male
          </Label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Label check>
            <input type="radio" className="form-check-input" id="female" name="gender" ref={register({ required: true })} value="Female" />{' '}
            Female
          </Label>
          {errors.gender && "Gender is required"}
        </FormGroup>
        </FormGroup>
        </Col>
        <Col md={2}>
        <FormGroup>
        <Label for="martial">Martial Status</Label>
        <select className="form-control" ref={register({ required: true })} name="martialstatus" id="martial">
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          {errors.martialstatus && " Martial Status is required"}
        </select>
      </FormGroup>
      </Col>
      <Col md={4}>
      <FormGroup>
            <Label for="food">Favourite Food</Label>
            <input className="form-control" type="text"  ref={register({ required: true })} name="food" id="food" placeholder="Favourite Food"/>
            {errors.food && "Favourite Food is required"}
      </FormGroup>
      </Col>
      <Col md={4}>
      <FormGroup>
            <Label for="color">Favourite Color</Label>
            <input className="form-control" type="text"  ref={register({ required: true })} name="color" id="color" placeholder="Favourite Color"/>
            {errors.color && "Favourite Color is required"}
      </FormGroup>
      </Col>
      </Row>
      
      <div className="center">
      <button type="submit" className="btn btn-secondary">Submit</button>
      </div>
      <p></p>
      {resultdata!=""?<b>{resultdata}</b>:null}
      
    </form>
    
    )


}


export default FormField;



