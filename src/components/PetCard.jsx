import React, {useEffect, useState, useContext}from 'react';
import UserNameContext from '../UserNameContext';
import { useParams, useNavigate } from 'react-router-dom';
import './PetCard.css';
import axios from 'axios';
import { Button } from '@chakra-ui/react';
import {Table, Thead, Tbody, Tr, Th, Td, TableContainer} from '@chakra-ui/react';
import {Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, Box, Input} from '@chakra-ui/react';



export default function PetCard(){
    const {id} = useParams();
    const card = JSON.parse(decodeURIComponent(id));
    const navigate = useNavigate();


    const {currentUser} = useContext(UserNameContext);


    const [petStatus, setPetStatus] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [alertColor, setAlertColor] = useState('');

    const [availabilityError, setAvailbilityError] = useState(false);
    const [savabilityError, setSavabilityError] = useState(false)
    const [loginError, setLoginError] = useState(false);
    
    const [undo, setUndo] = useState(false);
    const [typeUndo, setTypeUndo] = useState('');
   


    const handleAdopt = async (card) =>{
        console.log(card)
        console.log(localStorage.getItem('token'))
         try{
            console.log(card)
            const res = await axios.put(`http://localhost:8080/pets/adopt/${card.id}`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            console.log(res.data);
            if (res.data.message === "Success!"){
                setIsVisible(prev=>!prev); 
                setAlertColor('info');
                setPetStatus('adopted');
            }
         }
         catch(err){
            console.log(err);
            if (err.response.data.message === "Pet not available!"){
                setAvailbilityError(true);
            }
            else if (err.response.data.message === "Failed to authenticate"){
                setLoginError(true);
                localStorage.removeItem('token');
                navigate('/login')

            }
         }
    }

    const handleReturn = async (card) =>{
        console.log(card);
        try{
            console.log((currentUser).token)
            console.log(currentUser)
            console.log('above')
            const res = await axios.put(`http://localhost:8080/pets/return/${card.id}`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            console.log(res.data)
            if (res.data.message === 'Success!'){
                setUndo(true);
                setTypeUndo('returned')
            }
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

            console.log(res.data);
            if (res.data.message === "Success!"){
                setIsVisible(prev=>!prev); 
                setAlertColor('warning');
                setPetStatus('fostered')
            }
        }
         catch(err){
            console.log(err)
            console.log(err);
            if (err.response.data.message === "Pet not available!"){
                setAvailbilityError(true);
            }
            else if (err.response.data.message === "Failed to authenticate"){
                setLoginError(true);
                localStorage.removeItem('token');
                navigate('/login')
            }
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

            if (res.data.message === "Success!"){
                setIsVisible(prev=>!prev); 
                setAlertColor('success'); 
                setPetStatus('saved');
            }
        }
        catch(err){
            console.log(err)
            if (err.response.data.message === "Pet already saved"){
                setSavabilityError(true);
            }
        }
    }


    const handleCloseAvailabilityError = () =>{
        setAvailbilityError(false);
    }

    const handleCloseSavabilityError = () =>{
        setSavabilityError(false);
    }
    
    const handleCloseUndo = () =>{
        setUndo(false);
    }
        
    useEffect(()=>{
        console.log(card.adoptionStatus)
    }, [])
      

        return(
        <div className='specificPetPageContainer'>
            <div className='errorAlerts'>
                {availabilityError && <Alert onClick={handleCloseAvailabilityError} status='error'>
                    <AlertIcon />
                    This pet is not available! Click to close.
                </Alert>}
                {loginError && <Alert status='warning'>
                    <AlertIcon />
                    Your status has expired, please log in again
                </Alert>}
                {savabilityError && <Alert onClick={handleCloseSavabilityError} status='error'>
                    <AlertIcon />
                    You cannot save this pet twice! Click to close.
                </Alert>}
                {undo && <Alert onClick={handleCloseUndo} status='error'>
                    <AlertIcon />
                    Your pet has been successfully {typeUndo}. Click to close alert.
                </Alert>}
            </div>
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
                            Your has been {petStatus}!
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
                    {card.adoptionStatus === "Available" &&  <Button onClick={()=>{handleAdopt(card)}} colorScheme='blue'>Adopt</Button>}
                    {card.adoptionStatus !== "Available" && <Button onClick={()=>{handleReturn(card)}} colorScheme='blue'>Return</Button>}
                    {card.adoptionStatus === "Available" && <Button onClick={()=>{handleFoster(card)}} colorScheme='yellow'>Foster</Button>}
                    <Button onClick={()=>{handleSave(card)}} colorScheme='green'>Save</Button>
                    </>
                    
                    )}
            </div>
                
        </div>
        
    )
}