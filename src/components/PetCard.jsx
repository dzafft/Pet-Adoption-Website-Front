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
    
    const navigate = useNavigate();
    const randomKey = Math.floor(Math.random() * 1000) + 1;

    const [isMine, setIsMine] = useState(null);



    const {currentUser} = useContext(UserNameContext);

    const [pet, setPet] = useState({});
    const [petStatus, setPetStatus] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [alertColor, setAlertColor] = useState('');

    const [availabilityError, setAvailbilityError] = useState(false);
    const [savabilityError, setSavabilityError] = useState(false)
    const [loginError, setLoginError] = useState(false);
    
    const [undo, setUndo] = useState(false);
    const [typeUndo, setTypeUndo] = useState('');

    const [triggerGetPet, setTriggerGetPet] = useState(0);

    useEffect(()=>{
        async function getPet(){
            const res = await axios.get(`http://localhost:8080/pets/petcard/${id}`);
            console.log(res.data)
            if (res.data.message === 'Success!'){
                setPet(res.data.pet)
            }
        }
        getPet()
    }, [triggerGetPet])

    useEffect(()=>{
        async function petStatus(){
            const res = await axios.get(`http://localhost:8080/users/status/${localStorage.getItem('userEmail')}/${id}`);
            console.log(`http://localhost:8080/users/status/${localStorage.getItem('userEmail')}/${id}`)
            console.log(res.data)
            if (res.data.message === 'Success!'){
                if (res.data.isTrue === true){
                    setIsMine(true);
                }
                else{
                    setIsMine(false);
                }
            }
        }
        petStatus()
    }, [triggerGetPet])
   


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
                setTriggerGetPet(Math.floor(Math.random() * 1000000) + 1);
                setIsMine(true);
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
            console.log('above')
            const res = await axios.put(`http://localhost:8080/pets/return/${card.id}`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            console.log(res.data)
            if (res.data.message === 'Success!'){
                setUndo(true);
                setTypeUndo('returned');
                setTriggerGetPet(Math.floor(Math.random() * 1000000) + 1)
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
                setPetStatus('fostered');
                setTriggerGetPet(Math.floor(Math.random() * 1000000) + 1);
                setIsMine(true);
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
    const handleRedirect = () =>{
        navigate('/mypets')
    }

    const handleUnfoster = async (card) =>{
        console.log(card);
        try{
     
            console.log('above')
            const res = await axios.put(`http://localhost:8080/pets/unfoster/${card.id}`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            console.log(res.data)
            if (res.data.message === 'Success!'){
                setUndo(true);
                setTypeUndo('unfostered');
                setTriggerGetPet(Math.floor(Math.random() * 1000000) + 1)
            }
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
        

        return(
        <div className='specificPetPageContainer'>
            <Button onClick={handleRedirect}>Check out your pet page!</Button>
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
                {undo && <Alert onClick={handleCloseUndo} status='success'>
                    <AlertIcon />
                    Your pet has been successfully {typeUndo}. Click to close alert.
                </Alert>}
            </div>
            <div className='specificPetPageBody'>
                <img className='specificPetImage' src={pet.picture} alt='Pet_picture' />
                <div className='petSpecificInformation'>
                    <h3 className='petCardName'>{pet.name}'s Profile</h3>
                    <TableContainer>
                    <Table variant='simple'>
                    <Thead>
                    <Tr>
                        <Th>{pet.name}</Th>
                        <Th>Information</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    <Tr>
                        <Td>Breed</Td>
                        <Td>{pet.breed}</Td>
                    </Tr>
                    <Tr>
                        <Td>Dietary restrictions</Td>
                        {((pet.dietary)?.length === 0)?
                        <Td>
                            <ul>
                                {(pet.dietary)?.map((restriction) => (
                                    <li key={randomKey}>{restriction}</li>
                                ))}
                            </ul>
                        </Td> : 
                        <Td>
                            None
                        </Td>}
                    </Tr> 
                    
                    <Tr>
                        <Td>Color</Td>
                        <Td>{pet.color}</Td>
                    </Tr>
                    <Tr>
                        <Td>Hypoallergenic?</Td>
                        {console.log(pet.hypoallergnic)}
                        <Td>{`${pet.hypoallergnic}`}</Td>
                    </Tr>
                    <Tr>
                        <Td>Height</Td>
                        <Td>{pet.height}</Td>
                    </Tr>
                    <Tr>
                        <Td>Weight</Td>
                        <Td>{pet.weight}</Td>
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
                    {pet.adoptionStatus === "Available" && <Button onClick={()=>{handleAdopt(pet)}} colorScheme='blue'>Adopt</Button>}
                    {pet.adoptionStatus === "Adopted" && isMine && <Button onClick={()=>{handleReturn(pet)}} colorScheme='blue'>Return</Button>}
                    {pet.adoptionStatus === "Available" && <Button onClick={()=>{handleFoster(pet)}} colorScheme='yellow'>Foster</Button>}
                    {pet.adoptionStatus === "Fostered" && isMine &&<Button onClick={()=>{handleUnfoster(pet)}} colorScheme='yellow'>Unfoster</Button>}
                    <Button onClick={()=>{handleSave(pet)}} colorScheme='green'>Save</Button>
                    </>
                    
                    )}
            </div>
                
        </div>
        
    )
}