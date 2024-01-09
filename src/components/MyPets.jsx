import React, {useContext, useState, useEffect} from 'react';
import UserNameContext from '../UserNameContext';
import { Card, CardBody, CardFooter, Image, Stack, Text, ButtonGroup, Divider, Button} from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import axios from 'axios';
import './MyPets.css';

export default function MyPets(){
    const {currentUser} = useContext(UserNameContext);

    const [adoptedList, setAdoptedList] = useState([]);
    const [fosteredList, setFosteredList] = useState([]);
    const [savedList, setSavedList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const handleReturn = async (card) =>{
        console.log(card);
        try{
            console.log((currentUser).token)
            console.log(currentUser)
            console.log('above')
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/pets/return/${card.id}`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            console.log(res.data)
            if (res.data.message === 'Success!'){
                const filteredList = adoptedList.filter((pet)=> pet.id !== card.id);
                console.log(filteredList);
                setAdoptedList(filteredList);
            }
         }
         catch(err){
            console.log(err)
         }
    }

    useEffect(() => {
        
        console.log(adoptedList);
      }, [adoptedList]);

    const handleUnsave = async (card) =>{
        console.log(card);
        try{
            console.log(currentUser)
            console.log('above')
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/pets/unsave/${card.id}`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            console.log(res.data)
            if (res.data.message === 'Success!'){
                const filteredList = savedList.filter((pet)=> pet.id !== card.id);
                console.log(filteredList);
                setSavedList(filteredList);
            }
        }
         catch(err){
            console.log(err)
        }
    }

    const handleUnfoster = async (card) =>{
        console.log(card);
        try{
            console.log((currentUser).token)
            console.log(currentUser)
            console.log('above')
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/pets/unfoster/${card.id}`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            console.log(res.data)
            if (res.data.message === 'Success!'){
                const filteredList = fosteredList.filter((pet)=> pet.id !== card.id);
                console.log(filteredList);
                setFosteredList(filteredList);
            }
         }
         catch(err){
            console.log(err)
         }
    }
   

   

    useEffect(()=>{
        async function getAdoptedPets(){
            setIsLoading(true)
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/adopted/${localStorage.getItem('userEmail')}`)
            console.log(`${process.env.REACT_APP_API_URL}/users/adopted/${localStorage.getItem('email')}`);
            console.log(res.data);
            setAdoptedList(res.data.petList);
            setIsLoading(false)
        }      
            getAdoptedPets()
        
    }, [])

    useEffect(()=>{
        async function getFosteredPets(){
            setIsLoading(true)
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/fostered/${localStorage.getItem('userEmail')}`)

            console.log(res.data)
            setFosteredList(res.data.petList)
            setIsLoading(false)

        }
        getFosteredPets()
    }, [])

    useEffect(()=>{
        async function getSavedPets(){
            setIsLoading(true)
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/saved/${localStorage.getItem('userEmail')}`)

            console.log(res.data)
            setSavedList(res.data.petList)
            setIsLoading(false)
        }
        getSavedPets()
    }, [])

    useEffect(()=>{
        console.log(adoptedList)
    }, [adoptedList])

    
    useEffect(()=>{
        console.log(currentUser)
    }, [currentUser]);


    

    return(
        <div className='myPetsContainer'>
            <Tabs variant='soft-rounded' colorScheme='green'>
                <TabList className='tabList'>
                    <Tab>Adopted Pets</Tab>
                    <Tab>Fostered Pets</Tab>
                    <Tab>Saved Pets</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>    
                    {adoptedList.length > 0 ? (<ul className='adoptedList'>
                            {isLoading && <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>}
                            {adoptedList.map((card)=> (
                                    <Card maxW='sm' className='petCard' key={card._id}>
                                        <CardBody onClick={()=>{window.open(`/pets/${card.id}`)}} className='cardBody'>
                                            <Image className='myPetsImage' src={card.picture} alt='Profile_pic' borderRadius='lg' />
                                            <Stack mt='6' spacing='3'>
                                                
                                                <Text color='blue.600' fontSize='2xl'>
                                                    {card.name}
                                                </Text>
                                            </Stack>
                                        </CardBody>
                                    <Divider />
                                    <CardFooter>
                                    <ButtonGroup spacing='2'>
                                        <Button onClick={()=>handleReturn(card)}  variant='solid' colorScheme='blue'>
                                        Return
                                        </Button>
                                    </ButtonGroup>
                                    </CardFooter>
                                </Card>
                                ))}
                            </ul>) :
                            (<h3>No pets adopted, yet!</h3>)}
                    </TabPanel>
                    <TabPanel>
                    {fosteredList.length > 0 ? (<ul className='fosteredList'>
                        {isLoading && <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>}
                            {fosteredList.map((card)=> (
                                    <Card maxW='sm' className='petCard' key={card._id}>
                                        <CardBody onClick={()=>{window.open(`/pets/${encodeURIComponent(JSON.stringify(card))}`)}} className='cardBody'>
                                            <Image className='myPetsImage' src={card.picture} alt='Profile_pic' borderRadius='lg' />
                                            <Stack mt='6' spacing='3'>
                                                
                                                <Text color='blue.600' fontSize='2xl'>
                                                    {card.name}
                                                </Text>
                                            </Stack>
                                        </CardBody>
                                    <Divider />
                                    <CardFooter>
                                    <ButtonGroup spacing='2'>
                                        <Button onClick={()=>handleUnfoster(card)} variant='solid' colorScheme='blue'>
                                        Unfoster
                                        </Button>
                                    </ButtonGroup>
                                    </CardFooter>
                                </Card>
                                ))}
                            </ul>):
                            (<h3>No pets fostered, yet!</h3>)}
                    </TabPanel>
                    <TabPanel>
                    
                    {savedList.length > 0 ? (<ul className='savedList'>
                    {isLoading && <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>}
                            {savedList.map((card)=> (
                                    <Card maxW='sm' className='petCard' key={card._id}>
                                        <CardBody onClick={()=>{window.open(`/pets/${encodeURIComponent(JSON.stringify(card))}`)}} className='cardBody'>
                                            <Image className='myPetsImage' src={card.picture} alt='Profile_pic' borderRadius='lg' />
                                            <Stack mt='6' spacing='3'>
                                                
                                                <Text color='blue.600' fontSize='2xl'>
                                                    {card.name}
                                                </Text>
                                            </Stack>
                                        </CardBody>
                                    <Divider />
                                    <CardFooter>
                                    <ButtonGroup spacing='2'>
                                        <Button onClick={()=>handleUnsave(card)} variant='solid' colorScheme='blue'>
                                        Unsave
                                        </Button>
                                    </ButtonGroup>
                                    </CardFooter>
                                </Card>
                                ))}
                            </ul>) : 
                            (<h3>No pets saved, yet!</h3>)}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    )
}

