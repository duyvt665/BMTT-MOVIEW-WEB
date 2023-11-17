import "./Login.css"
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

const Login = () =>{

    const navigate = useNavigate();
    const [isCaptchaVerified, setCaptchaVerified] = useState(false);

    const handleRegister = () => {
        navigate('/register');
    };

    const handleHome = async () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const response = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            console.log('Login successful');
            // Redirect or set state to indicate successful login
        } else {
            console.error('Invalid credentials');
            // Handle failed login: show error message or perform necessary action
        }
        if (isCaptchaVerified) {
            // Perform login action
            navigate('/');
        } else {
            // Display an error or prompt to complete reCAPTCHA
            console.error("Please complete reCAPTCHA");
        }
    }

    const handleCaptchaChange = (value) => {
        // Handle reCAPTCHA verification status
        setCaptchaVerified(true);
    }

    return(
        <>
            <h2 className="animate-charcter1">LOGIN</h2> 
            <div className="form-login">
               
                <Form className="login-form">
                <div className="input-group">
                    <label for="username">Tên tài khoản</label>
                    <input type="text" id="username" name="username" required/>
                </div>
                <div className="input-group">
                    <label for="password">Mật khẩu</label>
                    <input type="password" id="password" name="password" required/>
                </div>
                <ReCAPTCHA className="capcha"
                        sitekey="6LcHTw8pAAAAAMuaJGh85LoqP4tTbNGz2pB2vfY0"
                        onChange={handleCaptchaChange}
                />
                <div className="button-group    ">
                    <button type="submit" onClick={handleHome}>Login</button>
                    <button type="button" onClick={handleRegister}>Register</button>
                </div>
                </Form>
            </div>
        </>
    )
}

export default Login;