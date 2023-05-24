import React, { useState, useContext}from 'react';
import UserNameContext from '../UserNameContext';
import { useParams, useNavigate } from 'react-router-dom';
import './PetCard.css';
import axios from 'axios';
import { Button } from '@chakra-ui/react';
import {Table, Thead, Tbody, Tr, Th, Td, TableContainer} from '@chakra-ui/react';
import {Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, Box, Input} from '@chakra-ui/react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';



export default function PetCard(){
    const {id} = useParams();
    const card = JSON.parse(decodeURIComponent(id));
    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {currentUser} = useContext(UserNameContext);


    const [petStatus, setPetStatus] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [alertColor, setAlertColor] = useState('');
   


    const handleAdopt = async (card) =>{
        console.log(card)
        console.log(localStorage.getItem('token'))
         try{
            console.log(card)
            const res = await axios.put(`http://localhost:8080/pets/adopt/${card.id}`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            console.log(res.data);
         }
         catch(err){
            console.log(err)
         }
    }

    const handleFoster = async (card) =>{
        console.log(card);
        console.log((localStorage.getItem('token')))
        try{
            console.log(currentUser)
            console.log('above')
            const res = await axios.put(`http://localhost:8080/pets/foster/${card.id}`, {}, { headers: { Authorization: `Bearer ${(localStorage.getItem('token'))}` } });

            console.log(res.data)
        }
         catch(err){
            console.log(err)
        }
    }

    const handleSave = async (card) =>{
        console.log(card);
        try{
            console.log(currentUser)
            console.log('above');
            console.log(localStorage.getItem('token'))
            
            const res = await axios.put(`http://localhost:8080/pets/save/${card.id}`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            console.log(res.data)
        }
        catch(err){
            console.log(err)
        }
    }

    
    
        
      

        return(
        <div className='specificPetPageContainer'>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{card.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        autoFocus
                    />
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
            <div className='specificPetPageBody'>
                <img className='specificPetImage' src={card.picture} alt='Pet_picture' />
                <div className='petSpecificInformation'>
                    <h3 className='petCardName'>{card.name}'s Profile</h3>
                    <TableContainer>
                    <Table variant='simple'>
                    <Thead>
                    <Tr>
                        <Th>{card.name}</Th>
                        <Th>Information</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    <Tr>
                        <Td>Breed</Td>
                        <Td>{card.breed}</Td>
                    </Tr>
                    <Tr>
                        <Td>Color</Td>
                        <Td>{card.color}</Td>
                    </Tr>
                    <Tr>
                        <Td>Hypoallergenic?</Td>
                        {console.log(card.hypoallergnic)}
                        <Td>{`${card.hypoallergnic}`}</Td>
                    </Tr>
                    <Tr>
                        <Td>Height</Td>
                        <Td>{card.height}</Td>
                    </Tr>
                    <Tr>
                        <Td>Weight</Td>
                        <Td>{card.weight}</Td>
                    </Tr>
                    </Tbody>
                </Table>
                </TableContainer>
                </div>
            </div>
            <div className='petCardStatus'>
                    
                    {isVisible ? (
                    <Alert status={alertColor}>
                        <AlertIcon />
                        <Box>
                            <AlertTitle>Success!</AlertTitle>
                            <AlertDescription>
                            Congradulations! Your has been {petStatus}!
                            </AlertDescription>
                        </Box>
                        <CloseButton
                            alignSelf='flex-start'
                            position='relative'
                            right={-1}
                            top={-1}
                            onClick={()=>{setIsVisible(prev=>!prev); setPetStatus('')}}
                            
                        />
                        </Alert>
                    ) : (
                        <>
                    <Button onClick={()=>{setIsVisible(prev=>!prev); setAlertColor('info'); setPetStatus('adopted'); handleAdopt(card)}} colorScheme='blue'>Adopt</Button>
                    <Button onClick={()=>{setIsVisible(prev=>!prev); setAlertColor('warning'); setPetStatus('fostered'); handleFoster(card)}} colorScheme='yellow'>Foster</Button>
                    <Button onClick={()=>{setIsVisible(prev=>!prev); setAlertColor('success'); setPetStatus('saved'); handleSave(card)}} colorScheme='green'>Save</Button>
                    </>
                    )}
            </div>
        </div>
        
    )
}