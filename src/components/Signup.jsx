import React, {useState, useContext, useEffect} from 'react';
import './Signup.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import UserNameContext from '../UserNameContext';



export default function Signup(){
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    // const [passwordMismatch, setPasswordMismatch] = useState(false);

    const {currentUser, setCurrentUser} = useContext(UserNameContext);

    const redirect = useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if (checkPassword === password){
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
                    firstName: res.data.dbUser.firstName,
                    lastName: res.data.dbUser.lastName,
                    number: res.data.dbUser.number,
                    id: res.data.dbUser._id,
                    token: res.data.dbUser.token
                })
                localStorage.setItem('token', res.data.dbUser.token);
                localStorage.setItem('userEmail', res.data.dbUser.email)
                redirect('/homepage')

            }
            catch (error){
                console.log(error)
            }
        }
    }

    useEffect(()=>{
        console.log(currentUser)
    }, [currentUser])

    return(
        <div className='signupContainer'>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control value = {email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control value = {password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckPassword">
            <Form.Label>Retype Password</Form.Label>
            <Form.Control value = {checkPassword} onChange={(e) => setCheckPassword(e.target.value)} type="password" placeholder="Password" />
            {['danger'].map((variant) => ( 
            <Alert key={variant} variant={variant}> Passwords Must Match!</Alert>
      ))}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control value = {firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control value = {lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control value = {phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button onClick={handleSubmit} variant="primary" type="submit">
            Submit
        </Button>
        < br />
        <Link to='/login'>Already have an account? Login.</Link>
        </Form>
    </div>
  );   
}