import React, {useState, useContext, useEffect} from 'react';
import './Signup.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import UserNameContext from '../UserNameContext';



export default function Signup(){
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [checkPasswordError, setCheckPasswordError] = useState(false);
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);



    const {currentUser, setCurrentUser} = useContext(UserNameContext);

    const redirect = useNavigate();

    

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if (checkPassword === password && email && firstName && lastName && phone){
            const newUser = {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phone
            }
            if (email.includes("@admin")){
                newUser.isAdmin = true;
                console.log(email)
            } 
            else{
                newUser.isAdmin = false;
            }
            setEmail('')
            setPassword('')
            setCheckPassword('')
            setFirstName('')
            setLastName('')
            setPhone('')
            
            try{
                const res = await axios.post('http://localhost:8080/signup', newUser)
                console.log(res.data)
                setCurrentUser({
                    email: res.data.dbUser.email,
                    password: res.data.dbUser.password,
                    firstName: res.data.dbUser.fistName,
                    lastName: res.data.dbUser.lastName,
                    number: res.data.dbUser.number,
                    id: res.data.dbUser._id,
                    token: res.data.dbUser.token
                })
                localStorage.setItem('token', res.data.dbUser.token);
                localStorage.setItem('userEmail', res.data.dbUser.email);
                if (res.data.dbUser.isAdmin === true){
                    redirect('/dashboard')
                }
                else{
                    redirect('/homepage')
                }
                

            }
            catch (error){
                console.log(error)
            }
        }
        else{
            alert('Please fill in all fields')
        }
    }

    const handleEmailBlur = () =>{
        if (!(/\S+@\S+\.\S+/.test(email))){
            setEmailError(true)
        }
        else{
            setEmailError(false);
        }
      
    }

    const handleBlur = (variable) =>{
        if (!password && variable === 'password'){
            setPasswordError(true);
            if (password !== checkPassword){
                setCheckPassword(true)
            }
            else{
                setCheckPassword(false)
            }
        }
        else{
            setPasswordError(false);
        }
        if (!phone && variable === 'phone'){
            setPhoneError(true);
        }
        else{
            setPhoneError(false);
        }
        if (!firstName && variable === 'firstName'){
            setFirstNameError(true);
        }
        else{
            setFirstNameError(false);
        }
        if (!lastName && variable === 'lastName'){
            setLastNameError(true);
        }
        else{
            setLastNameError(false);
        }
        
    }

    const handleCheckPasswordBlue = () =>{
        if (password !== checkPassword){
            setCheckPasswordError(true)
        }
        else{
            setCheckPasswordError(false)
        }
    }

    useEffect(()=>{
        console.log(currentUser)
    }, [currentUser]);

    

    return(
        <div className='signupContainer'>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control value = {email} onBlur={handleEmailBlur} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
            {emailError && <span style={{color: 'red'}}>Please fill in a valid email</span>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control value = {password} onBlur={()=>handleBlur('password')} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
            {passwordError && <span style={{color: 'red'}}>Please fill in a password</span>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckPassword">
            <Form.Label>Retype Password</Form.Label>
            <Form.Control value = {checkPassword} onBlur={handleCheckPasswordBlue} onChange={(e) => setCheckPassword(e.target.value)} type="password" placeholder="Retype Password" />
            {checkPasswordError && <span style={{color: 'red'}}>Passwords must match!</span>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control value = {firstName} onBlur={()=>handleBlur('firstName')} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name" />
            {firstNameError && <span style={{color: 'red'}}>Please fill in your first name</span>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control value = {lastName} onBlur={()=>handleBlur('lastName')} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last Name" />
            {lastNameError && <span style={{color: 'red'}}>Please fill in your last name</span>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control value = {phone} onBlur={()=>handleBlur('phone')} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="number" />
            {phoneError && <span style={{color: 'red'}}>Please fill in your phone number</span>}
        </Form.Group>
        
        <Button onClick={handleSubmit} variant="primary" type="submit">
            Submit
        </Button>
        < br />
        <p>
            Already have an account?
            <Link style={{ color: 'teal', textDecoration: 'underline' }} to="/login">
                Login.
            </Link>
        </p>
        </Form>
    </div>
  );   
}