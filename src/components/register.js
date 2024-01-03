import React, { useState ,useContext} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";

const Register=()=>{
    const [userDetails,setUserdetails]=useContext(userContext);
    const navigate= useNavigate();
    const[formData,setFormData]=useState({
        name:'',
        email:'',
        password:''
    });

    const {name,email,password}=formData;
    const onClick=(e)=>{
        setFormData((preState)=>({
            ...preState,
            [e.target.name]:e.target.value,
        }));
    };
    const onSubmit=async(e)=>{
        e.preventDefault();
        const user=await axios.post("api/user/register",formData)
        if(user.data){
            setFormData({
                name: '',
                email: '',
                password: '',
            });
            setUserdetails(user.data); 
           navigate('/');
          
        }
        
    
    }

    return(
           <section style={{marginRight:"30%",marginLeft:"30%"}}>
            <h1>Register</h1>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="text" placeholder="Enter Email"
                        value={email} 
                        name="email"
                        onChange={onClick}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" placeholder="Enter Name"
                        value={name}
                        name="name" 
                        onChange={onClick}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password"
                    value={password} 
                    name="password"
                    onChange={onClick}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" > 
                    Register
                </Button>
                </Form>
           </section>
    );
};

export  default Register;