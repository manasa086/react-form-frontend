import React,{Fragment,useState,useEffect} from 'react';
import csc from 'country-state-city';
import { useForm } from 'react-hook-form';
import { Col, Row, Button, Form, FormGroup, Label, input } from 'reactstrap';
import {useParams,useHistory} from "react-router-dom";
import routes from "../routes";

const EditPage=()=>{

    const history=useHistory();
    const { register, handleSubmit,errors } = useForm();

    const [inputValue,setInputValue]=useState([]);

    const { id }=useParams();
    useEffect(()=>{
        fetch("https://backend-form-data.herokuapp.com/editdelete/"+id)
        .then((res)=>res.json())
        .then((data)=>setInputValue(data.message))
        .catch((error)=>console.log(error))

    },[])
   
    let countries=csc.getAllCountries();
    let [countryData,setCountryData]=useState(countries)
    let [stateData,setStateData]=useState([]);
    let [cityData,setCityData]=useState([]);
    const changeState=(event)=>{
      setStateData(csc.getStatesOfCountry(event.target.value));
      setInputValue(inputValue.map((data,index)=>{
        var countryname=csc.getCountryById(event.target.value);
        data.country=countryname.name;
        return data;
    }));
      setInputValue(inputValue.map((data,index)=>{
        data.state=null;
        return data;
    }));
  
    }
    const onSubmit=(data)=>{
        var countryname=csc.getCountryById(data.country);
        data.country=countryname.name
        if(data.state!=inputValue[0].state)
        {
        var statename=csc.getStateById(data.state);
        data.state=statename.name;
        }
        else
        {
            data.state=inputValue[0].state
        }
        if(data.city!=inputValue[0].city)
        {
        var cityname=csc.getCityById(data.city);
        data.city=cityname.name;
        }
        else
        {
            data.city=inputValue[0].city;
        }
        data.dataid=Number(id);
        setInputValue(data);
        console.log(data);
        fetch("https://backend-form-data.herokuapp.com/update",{
            method:"PUT",
            body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }})
        .then((res)=>res.json())
        .then((data1)=>{
            // console.log(result,data1);
            if(data1.message==="data updated")
             {
                history.push(routes.editdelete);
             }
            
        })
        
        

        

    }
    const changeCity=(event)=>{
      setCityData(csc.getCitiesOfState(event.target.value));
      setInputValue(inputValue.map((data,index)=>{
        var statename=csc.getStateById(event.target.value);
        data.state=statename.name;
        return data;
    }));
      setInputValue(inputValue.map((data,index)=>{
        data.city=null;
        return data;
    }));
    }
    const ModifyData=(event)=>{      
        if(event.target.id==="name")
        {
        setInputValue(inputValue.map((data,index)=>{
            data.name=event.target.value;
            return data;
        }));
        }
        if(event.target.id==="email")
        {
            setInputValue(inputValue.map((data,index)=>{
                data.email=event.target.value;
                return data;
            }));

        }
        if(event.target.id==="address")
        {
            setInputValue(inputValue.map((data,index)=>{
                data.address=event.target.value;
                return data;
            }));
        }
        if(event.target.id==="address2")
        {
            setInputValue(inputValue.map((data,index)=>{
                data.address2=event.target.value;
                return data;
            }));
        }
        if(event.target.id==="city")
        {
            setInputValue(inputValue.map((data,index)=>{
                var cityname=csc.getCityById(event.target.value);
                data.city=cityname.name;
                return data;
            }));

        }
        if(event.target.id==="martial")
        {

            setInputValue(inputValue.map((data,index)=>{
                data.martialstatus=event.target.value;
                return data;
            }));
            console.log(inputValue[0]);

        }
        if(event.target.id==="male" || event.target.id==="female")
        {
            setInputValue(inputValue.map((data,index)=>{
                data.gender=event.target.value;
                return data;
            }));
        }
        if(event.target.id==="food")
        {
            setInputValue(inputValue.map((data,index)=>{
                data.food=event.target.value;
                return data;
            }));
        }
        
        if(event.target.id==="color")
        {
            setInputValue(inputValue.map((data,index)=>{
                data.color=event.target.value;
                return data;
            }));
        }
       
    }

    
    if(inputValue.length>0)
    {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="name">Name</Label>
            <input className="form-control" type="text"  value={inputValue[0].name} name="name" id="name" ref={register} placeholder="Name"  onChange={ModifyData}/>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="email">Email</Label>
            <input  className="form-control" type="email" value={inputValue[0].email} name="email" id="email" ref={register} placeholder="Email" onChange={ModifyData} />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label for="address">Address Line 1</Label>
        <input className="form-control" type="text" name="address" value={inputValue[0].address} id="address"  ref={register} placeholder="Address Line1" onChange={ModifyData}/>
        {errors.address && "Address Line1 is required"}
      </FormGroup>
      <FormGroup>
        <Label for="address2">Address Line 2</Label>
        <input className="form-control" type="text" name="address2" value={inputValue[0].address2} id="address2"  ref={register} placeholder="Address Line2" onChange={ModifyData} />
      </FormGroup>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="country">Country</Label>
        <select  className="form-control" ref={register} name="country" id="country" onChange={changeState}><option key="1" value="default">--Select--</option>
    {countryData.map((each,index)=>{
        if(each.name===inputValue[0].country)
            return <option key={index} value={each.id} selected>{each.name}</option> ;
        else
            return <option key={index} value={each.id}>{each.name}</option> ;
  })}</select>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="state">State</Label>
            <select  className="form-control" type="text"  ref={register} name="state" id="state" onChange={changeCity}><option key="1" value="default">--Select--</option>
    {inputValue[0].state!=null?<option key="2" selected>{inputValue[0].state}</option>:null} 
    {stateData.map((each,index)=>{
		return <option key={index} value={each.id} >{each.name}</option> ;
  })}</select>
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label for="city">City</Label>
            <select className="form-control" type="text" ref={register} name="city" onChange={ModifyData} id="city"><option key="1" value="default">--Select--</option>
            {inputValue[0].city!=null?<option key="2" selected>{inputValue[0].city}</option>:null} ; 
    {cityData.map((each,index)=>{
			return <option key={index} value={each.id}>{each.name}</option> ;
  })}</select>
        
          </FormGroup>  
          </Col>
          <Col md={2}>
        <FormGroup tag="fieldset">
        <Label for="gender">Gender</Label>
        <FormGroup check>
			{inputValue[0].gender==="Male"?
			 <Fragment>
			 <Label check>
            <input type="radio" className="form-check-input" id="male" name="gender" ref={register} value="Male" onChange={ModifyData} checked/>{' '}
            Male
          </Label>
		   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Label check>
            <input type="radio" className="form-check-input" id="female" name="gender" ref={register} value="Female"  onChange={ModifyData} />{' '}
            Female
          </Label>
          </Fragment>:<Fragment><Label check>
            <input type="radio" className="form-check-input" id="male" name="gender" ref={register} value="Male" onChange={ModifyData} />{' '}
            Male
          </Label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Label check>
            <input type="radio" className="form-check-input" id="female" name="gender" ref={register} value="Female" onChange={ModifyData} checked />{' '}
            Female
          </Label></Fragment>}
        </FormGroup>
        </FormGroup>
        </Col>
        <Col md={2}>
        <FormGroup>
        <Label for="martial">Martial Status</Label>
        <select className="form-control" ref={register} onChange={ModifyData} name="martialstatus" id="martial">
      {inputValue[0].martialstatus=="Single"?<Fragment><option value="Single" selected>Single</option><option value="Married">Married</option></Fragment>:<Fragment><option value="Single" >Single</option><option value="Married" selected>Married</option></Fragment>}
        </select>
      </FormGroup>
      </Col>
      <Col md={4}>
      <FormGroup>
            <Label for="food">Favourite Food</Label>
            <input className="form-control" type="text"  ref={register} onChange={ModifyData} value={inputValue[0].food} name="food" id="food" placeholder="Favourite Food"/>
      </FormGroup>
      </Col>
      <Col md={4}>
      <FormGroup>
            <Label for="color">Favourite Color</Label>
            <input className="form-control" type="text"  ref={register} onChange={ModifyData} value={inputValue[0].color} name="color" id="color" placeholder="Favourite Color"/>
      </FormGroup>
	  </Col>
        
      <div className="col-lg-4 offset-lg-5">
      <button type="submit" className="btn btn-secondary center" >Save</button>
      </div>
      </Row>
    </form>

    )
}
else
{
    return (null);
}

   


}


export default EditPage;