import React, {useContext, useEffect, useState} from 'react';
import { FormLabel, Input, Textarea, Switch, Button} from '@chakra-ui/react';
import './MyAccount.css';
import UserNameContext from '../UserNameContext';
import axios from 'axios';

export default function MyAccount(){
    const {currentUser, setCurrentUser} = useContext(UserNameContext);
    

    

    const [isChecked, setIsChecked] = useState(false);
    const [isInputsDisabled, setIsInputsDisabled] = useState(true);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [number, setNumber] = useState('');
    const [bio, setBio] = useState('');

    useEffect(()=>{
        setEmail(currentUser?.email);
        setFirstName(currentUser?.firstName)
        setLastName(currentUser?.lastName)
        setNumber(currentUser?.number)
        setBio(currentUser?.bio)
    })


    

    const handleSwitchChange = () =>{
        setIsChecked(prev=>!prev);
        
        setIsInputsDisabled(prev=>!prev)
        
    }

    const handleBio = (e) =>{
        setBio(e.target.value);
    }

    const handleSave = async () =>{
        const updateUser = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: number,
            bio: bio
        }

        try{
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/users/update/${currentUser.email}`, updateUser, {headers: { Authorization: `Bearer ${(localStorage.getItem('token'))}` }});

            console.log(res.data);
            if (res.data.message = 'Success'){
                setCurrentUser(res.data.user);
                localStorage.setItem('userEmail', res.data.user.email)
                
            }
            
        }
        catch (err){
            console.log(err);
        }

        handleSwitchChange();
        
    }

    return (
        <div className='myAccountContainer'>
            <h1>Account Preferences</h1>
            <div className='profileSwitchDiv'>
                <FormLabel htmlFor='profileSwitch'>Make changes?</FormLabel>
                <Switch isChecked={isChecked} onChange={handleSwitchChange} id='profileSwitch' size='lg' />
            </div>
            <div className='accountFormContainer'>
                <div className='emailAccountInput'>
                    <FormLabel htmlFor='emailAccount'>Email</FormLabel>
                    <Input value={email} onChange={(e)=>setEmail(e.target.value)} id='emailAccount' isDisabled={isInputsDisabled} ></Input>
                </div>
                <div className='passwordAccountContainer'>
                    <FormLabel htmlFor='passwordAccount'>Password</FormLabel>
                    <Input value={password} onChange={(e)=>setPassword(e.target.value)} id='passwordAccount' isDisabled={isInputsDisabled}></Input>
                </div>
                <div className='firstNameAccountContainer'>
                    <FormLabel htmlFor='firstNameAccount'>First Name</FormLabel>
                    <Input value={firstName} onChange={(e)=>setFirstName(e.target.value)} id='firstNameAccount' isDisabled={isInputsDisabled}  ></Input>
                </div>
                <div className='lastNameAccountContainer'>
                    <FormLabel htmlFor='lastNameAccount'>Last Name</FormLabel>
                    <Input value={lastName} onChange={(e)=>setLastName(e.target.value)} id='lastNameAccount' isDisabled={isInputsDisabled} ></Input>
                </div>
                <div className='phoneNumberAccount'>
                    <FormLabel htmlFor='phoneNumberAccount'>Phone Number</FormLabel>
                    <Input value={number} onChange={(e)=>setNumber(e.target.value)} id='phoneNumberAccount' isDisabled={isInputsDisabled} ></Input>
                </div>
                <div className='bioAccountContainer'>
                    <FormLabel htmlFor='bioAccount'>About me</FormLabel>
                    <Textarea onChange={handleBio} value={bio} id='bioAccount' isDisabled={isInputsDisabled} placeholder='Write short bio'></Textarea>
                    
                </div>
                <Button onClick={handleSave} isDisabled={isInputsDisabled}>Save</Button>
            </div>
        </div>

    )
}