import React, {useEffect, useContext, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {Card, Image, Stack, CardBody, Heading, Switch, CardFooter, Button} from '@chakra-ui/react';
import './OpenPerson.css';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';




export default function OpenPerson(){
    const { id } = useParams();
    const [account, setAccount] = useState({});
    const [accountAdoptedList, setAccountAdoptedList] = useState([])
    const [accountFosteredList, setAccountFosteredList] = useState([])
    const [accountSavedList, setAccountSavedList] = useState([]);

    const [isChecked, setIsChecked] = useState(false);

    const [triggerGetAdopted, setTriggerGetAdopted] = useState(0);
    const [triggerGetFostered, setTriggerGetFostered] = useState(0);
    const [triggerGetSaved, setTriggerGetSaved] = useState(0);

    const [name, setName] = useState('');
    const [breed, setBreed] = useState('')
    const [color, setColor] = useState('')
    const [isHypoallergenic, setIsHypoallergenic] = useState('')
    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('');
    const [petBio, setPetBio] = useState('');
    const [uploadedImage, setUploadedImage] = useState({});

    const [disabled, setDisabled] = useState(true);

    const [show, setShow] = useState(false);

    const [modalPet, setModalPet] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = (pet) => {
        setShow(true);
        setModalPet(pet);
        setName(pet.name);
        setBreed(pet.breed);
        setColor(pet.color);
        setIsHypoallergenic(`${pet.hypoallergnic}`);
        setWeight(pet.weight)
        setHeight(pet.height);
        setPetBio(pet.bio)
      };

    useEffect(()=>{
        async function getAccount(){
            const res = await axios.get(`http://localhost:8080/users/person/${id}`);
            console.log(res.data)
            setAccount(res.data.user);
        }
        getAccount()
    }, []);


    useEffect(()=>{
        async function getAdoptedPets(){
            const res = await axios.get(`http://localhost:8080/users/adopted/${account.email}`)
            console.log(res.data);
            setAccountAdoptedList(res.data.petList);
        }      
            getAdoptedPets()
        
    }, [account, triggerGetAdopted])

    useEffect(()=>{
        async function getFosteredPets(){
            const res = await axios.get(`http://localhost:8080/users/fostered/${account.email}`)

            console.log(res.data)
            setAccountFosteredList(res.data.petList)

        }
        getFosteredPets()
    }, [account, triggerGetFostered])

    useEffect(()=>{
        async function getSavedPets(){
            const res = await axios.get(`http://localhost:8080/users/saved/${account.email}`)

            console.log(res.data)
            setAccountSavedList(res.data.petList)
        }
        getSavedPets()
    }, [account, triggerGetSaved]);


    const handleSwitchChange = () =>{
        setIsChecked(prev=>!prev)
        setDisabled(prev=>!prev)
    }

    const handleUpdatePet = async () =>{
        console.log(modalPet)
        const newPet = {
            name: name,
            breed: breed,
            color: color,
            hypoallergnic: isHypoallergenic,
            weight: weight,
            height: height,
            bio: petBio
        }
        console.log(newPet)

        try{
            const combinedObject = new FormData();
            combinedObject.append('image', uploadedImage);
            for (let key in newPet){
                combinedObject.append(key, newPet[key]);
            }
            

            
            const res = await axios.put(`http://localhost:8080/pets/update/${modalPet._id}`, combinedObject, {headers: { Authorization: `Bearer ${(localStorage.getItem('token'))}` }});
            console.log(res.data);

            if (res.data.message === 'Success'){
                console.log('success!');
                if (res.data.petType === 'Adopted'){
                    setTriggerGetAdopted(Math.floor(Math.random() * 1000000) + 1)
                }
                else if (res.data.petType === 'Fostered'){
                    setTriggerGetFostered(Math.floor(Math.random() * 1000000) + 1)
                }
                else if (res.data.petType === 'Saved'){
                    setTriggerGetSaved(Math.floor(Math.random() * 1000000) + 1)
                }
                
                
            }
            else{
                console.log('no success')
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const handleImageUpload = (event) =>{
        const file = event.target.files[0];
        setUploadedImage(file);
    }
    return(
        <div className='openPersonContainer'>
            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton onClick={()=>{setIsChecked(false); setDisabled(true)}}>
                    <Modal.Title className='petModalTitle'>{modalPet.name}'s profile</Modal.Title>
                    <Switch isChecked={isChecked} size='lg' onChange={handleSwitchChange}/>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={(e)=>setName(e.target.value)} value={name} type="text" disabled={disabled}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridBreed">
                        <Form.Label>Breed</Form.Label>
                        <Form.Control onChange={(e)=>setBreed(e.target.value)} value={breed} type="text" disabled={disabled}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridColor">
                        <Form.Label>Color</Form.Label>
                        <Form.Control onChange={(e)=>setColor(e.target.value)} type="text" value={color} disabled={disabled}/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridHypoallergenic">
                        <Form.Label>Is pet hypoallergenic</Form.Label>
                        <Form.Control onChange={(e)=>setIsHypoallergenic(e.target.value)} value={isHypoallergenic} disabled={disabled}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridHeight">
                        <Form.Label>Height</Form.Label>
                        <Form.Control onChange={(e)=>setHeight(e.target.value)} type="number" value={height} disabled={disabled}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridWeight">
                        <Form.Label>Weight</Form.Label>
                        <Form.Control onChange={(e)=>setWeight(e.target.value)} type="number" value={weight} disabled={disabled} />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="formGridImage">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" onChange={handleImageUpload} disabled={disabled} />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Label>Bio</Form.Label>
                        <Form.Control
                                as="textarea"
                                value={petBio}
                                style={{ height: '100px' }}
                                disabled={disabled}
                                onChange={(e)=>setPetBio(e.target.value)}
                        />
                    </Row>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => { setIsChecked(false); setDisabled(true); handleClose()}}>
                    Close
                </Button>
                <Button isDisabled={disabled} variant="primary" onClick={() => {handleUpdatePet(); setIsChecked(false); setDisabled(true); handleClose()}}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
            <h2 className='openPersonContainerTitle'>{account.firstName} {account.firstName}'s pets</h2>
            <div className='accountAdoptedPets'>
                <h4>Adopted pets</h4>
                {(accountAdoptedList.length !== 0)?
                (<ul className='accountAdopedPetsUl'>
                    {accountAdoptedList.map((pet)=>(
                        <Card
                        direction={{ base: 'column', sm: 'row' }}
                        overflow='hidden'
                        variant='outline'
                        key={pet._id}
                        >
                            <Image
                                objectFit='cover'
                                maxW={{ base: '100%', sm: '200px' }}
                                src={pet.picture}
                                alt='Caffe Latte'
                            />

                            <Stack>
                                <CardBody>
                                <Heading size='md'>{pet.name}</Heading>

                                </CardBody>

                                <CardFooter>
                                <Button onClick={()=>handleShow(pet)} variant='solid' colorScheme='blue'>
                                    Full details
                                </Button>
                                </CardFooter>
                            </Stack>
                        </Card>
                    ))}
                    
                </ul>):(
                    <h5>None</h5>
                )}
            </div>
            <div className='accountFosteredPets'>
                <h4>Fostered pets</h4>
                {(accountFosteredList.length !== 0)?
                (<ul className='accountFosteredPetsUl'>
                    {accountFosteredList.map((pet)=>(
                        <Card
                        direction={{ base: 'column', sm: 'row' }}
                        overflow='hidden'
                        variant='outline'
                        key={pet._id}
                        >
                            <Image
                                objectFit='cover'
                                maxW={{ base: '100%', sm: '200px' }}
                                src={pet.picture}
                                alt='Caffe Latte'
                            />

                            <Stack>
                                <CardBody>
                                <Heading size='md'>{pet.name}</Heading>

                                </CardBody>

                                <CardFooter>
                                <Button onClick={()=>handleShow(pet)} variant='solid' colorScheme='blue'>
                                    Full details
                                </Button>
                                </CardFooter>
                            </Stack>
                        </Card>
                    ))}
                    
                </ul>):(
                    <h5>None</h5>
                )}
            </div>
            <div className='accountSavedPets'>
                <h4>Saved pets</h4>
                {(accountSavedList.length !== 0)?
                (<ul className='accountSavedPetsUl'>
                    {accountSavedList.map((pet)=>(
                        <Card
                        direction={{ base: 'column', sm: 'row' }}
                        overflow='hidden'
                        variant='outline'
                        key={pet._id}
                        >
                            <Image
                                objectFit='cover'
                                maxW={{ base: '100%', sm: '200px' }}
                                src={pet.picture}
                                alt='Caffe Latte'
                            />

                            <Stack>
                                <CardBody>
                                <Heading size='md'>{pet.name}</Heading>

                                </CardBody>

                                <CardFooter>
                                <Button onClick={()=>handleShow(pet)} variant='solid' colorScheme='blue'>
                                    Full details
                                </Button>
                                </CardFooter>
                            </Stack>
                        </Card>
                    ))}
                    
                </ul>):(
                    <h5>None</h5>
                )}
            </div>
            
            
        </div>
    )
}