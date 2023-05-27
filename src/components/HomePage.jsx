import React, {useContext, useState, useEffect} from 'react';
import {  useNavigate } from 'react-router-dom';
import UserNameContext from '../UserNameContext';
import './HomePage.css';
import axios from 'axios';
import {CardHeader, Heading, Button, Badge, Card, CardBody, CardFooter, Image, Stack, Text, Divider} from '@chakra-ui/react';


export default function HomePage(){

  const navigate = useNavigate();

  const {currentUser} = useContext(UserNameContext);
  const [remainingPets, setRemainingPets] = useState([]);
  const [moreAvailable, setMoreAvailable] = useState(0);
  const [mostSavedPets, setMostSavedPets] = useState([]);

  
  
  const redirect = useNavigate();


  const handleClick = () =>{
    redirect('/pets');
  }
 

  useEffect(()=>{
    console.log(currentUser)
}, [currentUser])

  useEffect(()=>{
    async function getAvailablePets(){
      const adoptionStatus = 'Available';
      try{
        const res = await axios.get(`http://localhost:8080/pets/availablepets?adoptionStatus=${adoptionStatus}`)
        console.log(res.data);
        if (res.data.message === "Success"){
          const list = res.data.pet.splice(0, 4)
          setRemainingPets(list);
          setMoreAvailable(res.data.listLength)
        }
        

      }
      catch(err){
        console.log(err)
      }
      
    }
    getAvailablePets()
  }, []);

  // useEffect(()=>{
  //   async function getSavedPets(){
  //     const oo = 'oo';
  //     try{
  //       const res = await axios.get(`http://localhost:8080/pets/mostsavedpets/${oo}`)
  //       console.log(res.data);
  //       if (res.data.message === "Success"){
  //         mostSavedPets(res.data.petList);
  //       }
        

  //     }
  //     catch(err){
  //       console.log(err)
  //     }
      
  //   }
  //   if (1 === 3){
  //     getSavedPets()
  //   }
  // }, []);




  const handleMeetAvailablePets = () =>{
    const availableRedirect = "Available";
    const isTrue = true
    window.open(`/search?availableRedirect=${availableRedirect}&isTrue=/${isTrue}`);
  }

  const handleMeetMostSavedPets = () =>{
    const availableRedirect = "Available";
    const isTrue = true
    window.open(`/search?availableRedirect=${availableRedirect}&isTrue=/${isTrue}`);
  }

  return (
    <div className='homepage'>
      <div className='homepageInfo'>
        <h1 className='homepageTitle'>Welcome {currentUser?.firstName} {currentUser?.lastName}!</h1>
        <img className='homeImg' src={require('./test.jpg')} alt='darkpet' />
      </div>
      <div className='mostSavedPets'>
        {/* <h2 className='mostSavedPetsTitle'>These are the pets that users are interested in!</h2>
          <ul className='UlHomepage'>
            {mostSavedPets.map((card)=>(
              <Card className='petCard' key={card._id}>
                <CardBody className='cardBody' >
                    <Image className='searchListImage' src={card.picture} alt='Photo unavailable' />
                    <Stack className='cardStack' mt='6' spacing='3'>
                        <Text color='black' fontSize='4xl'>
                            {card.name}
                        </Text>
                    </Stack>
                </CardBody>
            <Divider />
            <CardFooter>
                <Badge colorScheme='green'>Available</Badge>
            </CardFooter>
          </Card>
          ))}
            <Card className='lastHomepageCard'>
              <CardBody className='imgHomepageContainer'>
                <img className='lastCardImg' src={require('./paw.png')} alt='Paw' />
              </CardBody>
              <CardFooter className='lastCardFooter'>
                <Text className='lastCardFooterText'>{moreAvailable} more pets available</Text>
                <Button onClick={handleMeetMostSavedPets} className='lastCardButton'>Meet them!</Button>
              </CardFooter>
            </Card>
          </ul> */}
      </div>
      <div className='availablePets'>
        <h2 className='availablePetsTitle'>Pets Available for Adoption</h2>
        <ul className='petUlHomepage'>
          {remainingPets.map((card)=>(
            <Card className='petCard' key={card._id}>
              <CardBody className='cardBody' >
                  <Image className='searchListImage' src={card.picture} alt='Photo unavailable' />
                  <Stack className='cardStack' mt='6' spacing='3'>
                      <Text color='black' fontSize='4xl'>
                          {card.name}
                      </Text>
                  </Stack>
              </CardBody>
          <Divider />
          <CardFooter>
              <Badge colorScheme='green'>Available</Badge>
          </CardFooter>
        </Card>
        ))}
          <Card className='lastHomepageCard'>
            <CardBody className='imgHomepageContainer'>
              <img className='lastCardImg' src={require('./paw.png')} alt='Paw' />
            </CardBody>
            <CardFooter className='lastCardFooter'>
              <Text className='lastCardFooterText'>{moreAvailable} more pets available</Text>
              <Button onClick={handleMeetAvailablePets} className='lastCardButton'>Meet them!</Button>
            </CardFooter>
          </Card>
        </ul>
      </div>
    </div>
  );
}