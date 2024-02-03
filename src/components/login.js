import React, { useContext, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

import { useNavigate } from "react-router-dom";
import { userContext } from "../App";

const Login=()=>{
    const navigate= useNavigate();
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const [userDetails,setUserdetails]=useContext(userContext);
    
    const onSubmit=async(e)=>{
        e.preventDefault();
        const user=await axios.post('api/user/login',{'email':email,'password':password});
        setUserdetails(user.data);
        navigate('/');
        
    }
    return(
           <section style={{marginRight:"30%",marginLeft:"30%"}}>
            <h1>Login</h1>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="text" placeholder="Enter Email"
                        value={email} 
                        onChange={(e)=>{
                            setEmail(e.target.value);
                        }}
                    />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password"
                    value={password} 
                    onChange={(e)=>{
                        setPassword(e.target.value);
                    }}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" > 
                    Login
                </Button>
                </Form>
           </section>
    );
};

export  default Login;