import React from "react";
import { useState, useEffect } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    LastName: "",
    email: "",
    mobileNumber: "",
    address: "",
    errorMsg: "",
  });

  useEffect(() => {
    console.table(formData);
  }, [formData.errorMsg]);

  const formHandel = async (e) => {
    console.log("hi..");

    if (formData.firstName === "") {
      alert("please enter firstName");
      return true;
    }
    if (formData.LastName === "") {
      alert("please enter LastName");
      return true;
    }
    if (
      !formData.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      alert("you have not enter valid email");
      return true;
    }
    console.log(typeof formData.mobileNumber);
    if (!formData.mobileNumber.match("[0-9]{10}")) {
      alert("please enter  Mobile Number in 10 digits");
      return true;
    }
    if (formData.address === "") {
      alert("please enter address");
      return true;
    }

    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let res = await fetch("http://localhost:4000/form_submit", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          firstname: formData.firstName,
          LastName: formData.LastName,
          email: formData.email,
          mobile: formData.mobileNumber,
          address: formData.address,
        }),
      });

      let resJson = await res.json();
      console.log(resJson.error);
      // if response has error then display on UI
      if (resJson.hasOwnProperty("error")) {
        // display error on UI
        setFormData({
          ...formData,
          errorMsg: resJson.error,
          firstName: "",
          LastName: "",
          email: "",
          mobileNumber: "",
          address: "",
        });
      }

      if (!resJson.hasOwnProperty("error")) {
        setFormData({
          ...formData,
          firstName: "",
          LastName: "",
          email: "",
          mobileNumber: "",
          address: "",
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      console.log(formData);
    }
  };
  return (
    <div>
      <input
        className="inputbox"
        type="text"
        onChange={(e) =>
          setFormData({ ...formData, firstName: e.target.value })
        }
        value={formData.firstName}
        placeholder="Enter First Name"
      />
      <input
        className="inputbox"
        type="text"
        onChange={(e) => setFormData({ ...formData, LastName: e.target.value })}
        value={formData.LastName}
        placeholder="Enter Last Name"
      />

      <input
        className="inputbox"
        type="text"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        value={formData.email}
        placeholder="Enter Email"
      />
      <input
        className="inputbox"
        type="text"
        onChange={(e) =>
          setFormData({ ...formData, mobileNumber: e.target.value })
        }
        value={formData.mobileNumber}
        placeholder="Enter Mobile Number"
      />

      <input
        className="inputbox"
        type="text"
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        value={formData.address}
        placeholder="Enter Address"
      />
      <button onClick={formHandel}>Save</button>
      <b>{formData.errorMsg}</b>
    </div>
  );
};
export default Form;
