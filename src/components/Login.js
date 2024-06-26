import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = (props) => {
    const [creds, setCreds] = useState({ email: "", password: "" });
    let history = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json" // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ email: creds.email, password: creds.password })
        });
        const json = await response.json();
        console.log(json);
        if(json.success) {
            //save the auth token and redirect
            localStorage.setItem('token',json.authToken);
            props.showAlert("Logged into your account successfully", "success")
            history("/");
            
        }
        else{
            props.showAlert("Login failed, try inserting correct defaults", "danger")
        }

    }
    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value }) // ...note, () means that let note be whatever it is and add the next part to it
    }
    return (
        <div className = "mt-3">
            <h2>Login to continue to iNoteBook</h2>
            <form onSubmit = {handleSubmit}>
                <div className="mb-3" onSubmit={handleSubmit}>
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={onChange} value={creds.email} name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={creds.password} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
