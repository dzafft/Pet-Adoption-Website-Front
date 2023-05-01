import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from 'axios';


export default function Navbar(){
    const history = useNavigate()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Sign up useState
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [signUpCheckPassword, setSignUpCheckPassword] = useState('');
    const [signUpFirstName, setSignUpFirstName] = useState('');
    const [signUpLastName, setSignUpLastName] = useState('');
    const [signUpNumber, setSignUpNumber] = useState('');

    //Login useState
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');



    const handleSignUp = (event) =>{ 
        event.preventDefault();
        const data = {
            email: signUpEmail,
            password: signUpPassword,
            firstName: signUpFirstName,
            lastName: signUpLastName,
            number: signUpNumber
        }

        axios.post('http://localhost:8080/signup', data)
        .then((res) =>{
            if (res.data == 'exist'){
                alert('User already exists')
            }
            else if (res.data == 'nonexistent'){
                history('/', {state: {id: email}})
            }
            
        })
        .catch((err) =>{
            console.log(err)
        })
    }   

   const handleSignUpAndClose = (e) =>{
    handleSignUp(e)
    handleClose();
   }


   const handleLoginAndClose = (e) =>{
    handleLogin(e);
    handleClose();
   }

   const handleLogin = (event) =>{
    event.preventDefault();
    const data = {
        email: loginEmail,
        password: loginPassword,
        
    }

    axios.post('http://localhost:8080/login', data)
        .then((res) =>{
            if (res.data == 'exist'){
                console.log(res.data)
                history('/', {state: {id: email}})
            }
            else if (res.data =='nonexistent'){
                alert('User is has not signed up')
            }
            
        })
        .catch((err) =>{
            console.log(err)
        })

   }

   useEffect( () =>{
    axios.get('http://localhost:8080/signup')
        .then((res)=>{
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
   }, [])


    return(
        <>
        <nav>
            
            <Link to='/'>HomePage</Link>
            <Button variant="primary" onClick={handleShow}>
            Sign In
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>
                    <Tabs
                    defaultActiveKey="profile"
                    id="justify-tab-example"
                    className="mb-3"
                    justify
                    >
                    <Tab eventKey="home" title="Sign Up">
                        <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                autoFocus
                                onChange={(e) => setSignUpEmail(e.target.value)}
                                value={signUpEmail}
                            />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="password1234"
                                autoFocus
                                onChange={(e) => setSignUpPassword(e.target.value)}
                                value={signUpPassword}
                            />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>Retype Password</Form.Label>
                            <Form.Control
                                type="password"
                                autoFocus
                                onChange={(e) => setSignUpCheckPassword(e.target.value)}
                                value={signUpCheckPassword}
                            />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="John"
                                autoFocus
                                onChange={(e) => setSignUpFirstName(e.target.value)}
                                value={signUpFirstName}
                            />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Smith"
                                autoFocus
                                onChange={(e) => setSignUpLastName(e.target.value)}
                                value={signUpLastName}
                            />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="058-999-9999"
                                autoFocus
                                onChange={(e) => setSignUpNumber(e.target.value)}
                                value={signUpNumber}
                            />
                            </Form.Group>
                        </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={(e) =>handleSignUpAndClose(e)} >
                            Sign Up
                        </Button>
                        </Modal.Footer>
                    </Tab>
                    
                    <Tab eventKey="longer-tab" title="Login">
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                autoFocus
                                onChange={(e) => setLoginEmail(e.target.value)}
                                value={loginEmail}
                            />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                autoFocus
                                onChange={(e) => setLoginPassword(e.target.value)}
                                value={loginPassword}
                            />
                            </Form.Group>
                        </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={(e) =>handleLoginAndClose(e)}>
                            Login
                        </Button>
                        </Modal.Footer>
                    </Tab>
                
                </Tabs>
                </Modal.Title>
                </Modal.Header>
                
            </Modal>
            
            
        </nav>

            
        </>
    )
}   