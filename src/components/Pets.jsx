import React, {useContext, useState, useEffect} from 'react';
import './Pets.css';
import UserNameContext from '../UserNameContext';
import {Button, Badge, Card, CardBody, CardFooter, Image, Stack, Text, Divider} from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom';

export default function Pets(props){
    const {petList, currentUser} = useContext(UserNameContext);


   

    const navigate = useNavigate();
    
    

    const handleOpenPet = (card) =>{
        if (currentUser){
            console.log(currentUser)
            console.log(localStorage.getItem('currentUser'))
            console.log((card))
            window.open(`/pets/${card.id}`);
        }
        else{
            alert('Not signed in!!')
            navigate('/login');
        }
        
    }   
    useEffect(()=>{
        console.log('currentUser:')
        console.log(currentUser)
    })
 
    return (
        
        <div className='petsContainer'>
            <ul className='petUl'>
                {petList?.map((card)=> (
                    <Card className='petCard' key={card._id}>
                        <CardBody onClick={()=>handleOpenPet(card)} className='cardBody' >
                        
                            <Image className='searchListImage' src={card.picture} alt='Photo unavailable' />
                            <Stack className='cardStack' mt='6' spacing='3'>
                                <Text color='black' fontSize='4xl'>
                                    {card.name}
                                </Text>
                            </Stack>
                            
                        </CardBody>
                    <Divider />
                    <CardFooter>
                        {(card.adoptionStatus === 'Adopted') &&
                        (<Badge colorScheme='blue'>Adopted</Badge>)}
                        {(card.adoptionStatus === 'Fostered') &&
                        (<Badge colorScheme='orange'>Fostered</Badge>)}
                        {(card.adoptionStatus === 'Available') &&
                        (<Badge colorScheme='green'>Available</Badge>)}
                    </CardFooter>
                  </Card>
                ))}
            </ul>
        </div>
    )
}