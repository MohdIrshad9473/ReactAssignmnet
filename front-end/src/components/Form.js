import React from "react";
import { useState } from "react";

const Form = ()=>{
  const[firstName, setFirstName ] = useState('');
  const[LastName, setLastName ] = useState('');
  const[email, setEmail ] = useState('');
  const[mobileNumber, setMobileNumber ] = useState('');
  const[address, setAddress ] = useState('');
  const[errorMsg, setErrorMsg ] = useState('');

  const formHandel = async(e)=>{
    console.log("hi..");
    if(firstName === "")
        {      
          alert("please enter firstName");
          return(true) 
        }
        if(LastName === "")
        {      
          alert("please enter LastName");
          return(true) 
        }  
        if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
             alert("you have not enter valid email");
             return(true)
        }
        if(!mobileNumber.match('[0-9]{10}'))
        {      
          alert("please enter  Mobile Number in 10 digits");
          return(true) 
        } 
        if(address ==="")
        {      
          alert("please enter address");
          return(true) 
        } 
        
 
    try{
        var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
        let res = await fetch("http://localhost:4000/form_submit", {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify({
            firstname: firstName,
            LastName: LastName,
            email: email,
            mobile: mobileNumber,
            address: address,
          }),
          
        });
       
        let resJson = await res.json();
        // if response has error then display on UI
        if(resJson.hasOwnProperty("error")){
            // display error on UI
            setErrorMsg(resJson.error)
            
        }
        else{
            setErrorMsg("")
        }
        localStorage.setItem("formData", JSON.stringify(resJson));
        console.log(resJson)
        if (res.status === 200) {
            setFirstName("");
            setLastName("");
            setEmail("");
            setMobileNumber("");
            setAddress("");
        } else {
          console.log("some error occure");
        }

       }catch(err){
        console.log(err);
       }
  }
    return(
        <div>

          <input className='inputbox' type="text"
            onChange={(e)=>setFirstName(e.target.value)} value={firstName} placeholder='Enter First Name'/>
            <input className='inputbox' type="text"
            onChange={(e)=>setLastName(e.target.value)} value={LastName} placeholder='Enter Last Name'/>
            
            <input className='inputbox' type="text"
            onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='Enter Email'/>
            <input className='inputbox' type="text"
            onChange={(e)=>setMobileNumber(e.target.value)} value={mobileNumber} placeholder='Enter Mobile Number'/>
           
            <input className='inputbox' type="text" onChange={(e)=>setAddress(e.target.value)} value={address} placeholder='Enter Address'/>
            <button onClick={formHandel}>Save</button>  
            <b>{errorMsg}</b>    
         </div>
    )
}
export default Form;