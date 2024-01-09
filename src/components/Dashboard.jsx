import React, { useEffect, useState} from 'react';
import axios from 'axios';
import {Button, Card, CardHeader, StackDivider, CardBody, Stack, Heading, Box, Text} from '@chakra-ui/react';
import './Dashboard.css';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';



export default function Dashboard(){
    const [userList, setUserList] = useState([]);
    const [adminList, setAdminList] = useState([]);
    const hello = 'hello';

    const [name, setName] = useState('');
    const [breed, setBreed] = useState('')
    const [color, setColor] = useState('')
    const [isHypoallergenic, setIsHypoallergenic] = useState('')
    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('');
    const [petBio, setPetBio] = useState('');
    const [uploadedImage, setUploadedImage] = useState({});
    const [petType, setPetType] = useState('');

    const [dietary, setdietary] = useState([]);
    


    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setName('');
        setBreed('');
        setColor('');
        setIsHypoallergenic('');
        setWeight('')
        setHeight('');
        setPetBio('')
    }
    const handleShow = () => setShow(true);


    useEffect(()=>{
        async function getUsers(){
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/list/${hello}`);
            console.log(res.data);
            setUserList(res.data.users);
            setAdminList(res.data.admins)
        }
        getUsers();
    }, []);

    const handleOpenUser = (id) =>{
        window.open(`/person/${id}`);
    }

    
    const handleAddPet = async (e) =>{
        if (!name || !breed || !color || !isHypoallergenic || !weight || !height){
            console.log('boom')
            alert('All categories must be filled in!');
            return 
        }
        console.log('pow')
        const newPet = {
            name: name,
            type: petType,
            breed: breed,
            color: color,
            hypoallergnic: isHypoallergenic,
            weight: weight,
            height: height,
            bio: petBio
        }
        console.log(newPet);
        try{
            const combinedObject = new FormData();
            combinedObject.append('image', uploadedImage);
            for (let key in newPet){
                combinedObject.append(key, newPet[key]);
            }

            const res = await axios.post(`${process.env.REACT_APP_API_URL}/pets/addpet`, combinedObject, {headers: { Authorization: `Bearer ${(localStorage.getItem('token'))}` }});
            console.log(res.data);
        }
        catch(err){
            console.log(err)
        }
    }
    const handleImageUpload = (event) =>{
        const file = event.target.files[0];
        setUploadedImage(file);
    }

   
    return(
        <div className='dashboard'>
            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton >
                    <Modal.Title >New Pet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="newPetName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={(e)=>setName(e.target.value)} value={name} type="text" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="newPetBreed">
                        <Form.Label>Breed</Form.Label>
                        <Form.Control onChange={(e)=>setBreed(e.target.value)} value={breed} type="text"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="newPetColor">
                        <Form.Label>Color</Form.Label>
                        <Form.Control onChange={(e)=>setColor(e.target.value)} type="text" value={color} />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="newPetIsHypoallergenic">
                        <Form.Label>Is pet hypoallergenic</Form.Label>
                        <Form.Control onChange={(e)=>setIsHypoallergenic(e.target.value)} value={isHypoallergenic} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="newPetHeight">
                        <Form.Label>Height</Form.Label>
                        <Form.Control onChange={(e)=>setHeight(e.target.value)} type="number" value={height} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="newPetWeight">
                        <Form.Label>Weight</Form.Label>
                        <Form.Control onChange={(e)=>setWeight(e.target.value)} type="number" value={weight} />
                        </Form.Group>
                    </Row>
                    {/* <Row>
                        {dietary.map((restriction)=>(
                            <Form.Group as={Col} controlId="restriction">
                            <Form.Label>Restriction #{dietary.length +1}</Form.Label>
                            <Form.Control type="text" placeholder='restriction' onChange={handleImageUpload} value={restriction.type} />
                            </Form.Group>
                        ))}
                    </Row> */}
                    <Row>
                        <Form.Group as={Col} controlId="newPetImage">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" onChange={handleImageUpload}  />
                        </Form.Group>
                        
                        <Form.Group  as={Col} className="addPetType">
                        <Form.Label>Kind of pet</Form.Label>
                        <Form.Select value={petType} onChange={(e)=>setPetType(e.target.value)}>
                            <option value="">Select</option>
                            <option value="Dog">Dog</option>
                            <option value="Cat">Cat</option>
                        </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Label>Bio</Form.Label>
                        <Form.Control
                                as="textarea"
                                value={petBio}
                                style={{ height: '100px' }}
                                onChange={(e)=>setPetBio(e.target.value)}
                        />
                    </Row>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => {handleAddPet(); handleClose()}}>
                    Add Pet!
                </Button>
                </Modal.Footer>
            </Modal>
            <div className='titleDiv'>
                <h1 className='dashboardTitle'>My dashboard</h1>
                <Button onClick={handleShow} colorScheme='teal' size='lg'>+ Add a pet!</Button>
            </div>
            <div className='usersList'>
                <h3 className='currentUsersTitle'>Current users:</h3>
                {(userList.length === 0)? 
                <div>...</div> :
                <ul className='displayUsers'>
                    {userList.map((user)=>(
                        <Card className='userLi' key={user._id}>
                            <CardHeader>
                            <Heading onClick={()=>handleOpenUser(user._id)} className='userCardHeader' size='md'>{user.firstName} {user.lastName}</Heading>
                            </CardHeader>
                        
                            <CardBody>
                            <Stack divider={<StackDivider borderColor="black" />} spacing='4'>
                                <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Overview
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    <ul>
                                        <li>Adopted pets: {user.adoptedPets.length}</li>
                                        <li>Fostered pets: {user.fosteredPets.length}</li>
                                        <li>Saved pets: {user.savedPets.length}</li>
                                    </ul>
                                </Text>
                                </Box>
                                <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Contact
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    <ul>
                                        <li>Email: {user.email}</li>
                                        <li>Phone number: {user.number}</li>
                                    </ul>
                                </Text>
                                </Box>
                            </Stack>
                            </CardBody>
                        </Card>
                    ))}
                </ul>
                
                }
            </div>
            <div className='adminList'>
                <h3 className='currentAdminsTitle'>Current admins:</h3>
                <ul className='displayAdmins'>
                    {adminList.map((admin)=>(
                        <Card className='adminLi' key={admin._id}>
                            <CardHeader>
                            <Heading onClick={()=>handleOpenUser(admin._id)} className='adminCardHeader' size='md'>{admin.firstName} {admin.lastName}</Heading>
                            </CardHeader>
                            <CardBody>
                            <Stack divider={<StackDivider borderColor="darkgray" />} spacing='4'>
                                <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Overview
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    <ul>
                                        <li>Adopted pets: {admin.adoptedPets.length}</li>
                                        <li>Fostered pets: {admin.fosteredPets.length}</li>
                                        <li>Saved pets: {admin.savedPets.length}</li>
                                    </ul>
                                </Text>
                                </Box>
                                <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Contact
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    <ul>
                                        <li>Email: {admin.email}</li>
                                        <li>Phone number: {admin.number}</li>
                                    </ul>
                                </Text>
                                </Box>
                            </Stack>
                            </CardBody>
                        </Card>
                    ))}
                </ul>
            </div>
        </div>
    )
}