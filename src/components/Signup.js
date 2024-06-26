import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Signup = (props) => {
  const [creds, setCreds] = useState({ name: "", email: "", password: "", cpassword: "" });
  let history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = creds;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json" // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ name, email, password }) //can use them directly as i've destructured it
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {  //save the auth token and redirect
      localStorage.setItem('token', json.authToken);
      history("/");
      props.showAlert("Account created successfully", "success")
    }
    else {
      props.showAlert("Invalid credentials", "danger")
    }

  }
  const onChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value }) // ...note, () means that let note be whatever it is and add the next part to it
  }
  return (
    <div className='container mt-2'>
      <h2>Create an account to use iNoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
