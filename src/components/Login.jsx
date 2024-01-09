import React, {useState, useEffect, useContext} from 'react';
import {Link, Navigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import UserNameContext from '../UserNameContext';


export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setCurrentUser, currentUser } = useContext(UserNameContext);
    const navigate = useNavigate();


    const redirect = useNavigate();

    const handleSubmit =  async (e) =>{
        e.preventDefault();
        
        const loginUser = {
            email: email,
            password: password
        }
        try{
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, loginUser)
            const data = res.data.user;
            console.log(data)
            console.log('no error');
            localStorage.setItem('token',res.data.user.token )
            localStorage.setItem('userEmail', res.data.user.email);
            setCurrentUser(res.data.user);
            navigate('/homepage')
            
            setEmail('');
            setPassword('');
        }
        
        catch (error){
            console.log(error)
            alert('Invalid login!')
           
        }
    }
    return(
        <div className='loginContainer'>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Password" />
                </Form.Group>
                <Button onClick={handleSubmit} variant="primary" type="submit">
                    Submit
                </Button>
                < br />
                <p>
                Don't have an account yet?
                    <Link style={{ color: 'teal', textDecoration: 'underline' }} to="/signup">
                        Sign up.
                </Link>
        </p>
            </Form>
            
        </div>

    )
}