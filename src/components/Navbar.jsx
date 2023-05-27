import React, { useEffect, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import UserNameContext from '../UserNameContext';
import './Navbar.css';
import axios from 'axios';
import {Button, Menu, MenuButton, MenuList, MenuGroup, MenuItem, MenuDivider  } from '@chakra-ui/react';





export default function Navbar(){

    const navigate = useNavigate();

    const { currentUser, setCurrentUser} = useContext(UserNameContext)
    const handleLogout = () =>{
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        setCurrentUser(null);
        navigate('/login');
        
    }

    useEffect(()=>{
        async function getUser(){
            console.log(localStorage.getItem('userEmail'))
            const res = await axios.get(`http://localhost:8080/users/${localStorage.getItem('userEmail')}`);
            console.log(res.data);
            if (res.data.message === 'Success!'){
                setCurrentUser(res.data.user);
            }
        }
        getUser();
    }, [])

  
    
    useEffect(()=>{
        console.log(currentUser)
    }, [currentUser])

    const handleMyAccount = () =>{
        navigate('/myaccount');
    }



    const handlePets = () =>{
        navigate('/mypets')
    }
  
   
    return(
        <>
            <nav className='navbar'>
                <div className='navLeft'>
                    <img className='logo' src={require('./petLogo.png')} alt='petLogo' />
                    <Link className='homePageLink' to='/homepage'>HomePage</Link>
                    {(currentUser?.isAdmin === true) &&  <Link className='dashboardLink' to='/dashboard'>Admin Dashboard</Link>}
                    <Link className='searchLink' to='/search'>Search</Link>
                
                    
                </div>
                    <div className='navRight'>
                        {!(currentUser)? 
                        (<div className='navRightLoggedOut'>
                            <Link className='loginLink' to = '/login'>Login</Link>
                            <Link className='signupLink' to = '/signup'>Sign Up</Link>
                        </div> ) :
                            <div className='navRightLoggedIn'>
                                {currentUser && <p className='navEmail'>{currentUser?.email}</p>}
                                <Menu className='navMenu'>
                                    <MenuButton className='menuButton' as={Button} colorScheme='pink'>
                                        Profile
                                    </MenuButton>
                                    <MenuList>
                                        <MenuGroup title='Profile'>
                                        <MenuItem onClick={handlePets}>My Pets </MenuItem>
                                        <MenuItem onClick={handleMyAccount}>My Account</MenuItem>
                                        <MenuItem onClick={handleLogout}>Logout </MenuItem>
                                        </MenuGroup>
                                        <MenuDivider />
                                        <MenuGroup title='Help'>
                                        <MenuItem>Docs</MenuItem>
                                        <MenuItem>FAQ</MenuItem>
                                        </MenuGroup>
                                    </MenuList>
                                </Menu>
                            </div>}
                        
                    </div>
            </nav>
        </>
    )
}   