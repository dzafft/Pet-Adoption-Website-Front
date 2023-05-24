import React, {useContext, useEffect} from 'react';
import {  useNavigate } from 'react-router-dom';
import UserNameContext from '../UserNameContext';
import './HomePage.css';

export default function HomePage(){

  const {currentUser} = useContext(UserNameContext)
  
  
  const redirect = useNavigate();


  const handleClick = () =>{
    redirect('/pets');
  }
 

  useEffect(()=>{
    console.log(currentUser)
}, [currentUser])



  return (
    <div className='homepage'>
      <h3>Hello {currentUser?.firstName} {currentUser?.lastName}!</h3>
      <div className='homepageInfo'>
        <img className='homeImg' src={require('./darkpet.png')} alt='darkpet' />
        <img className='homeImg' src={require('./darkpet.png')} alt='darkpet' />
      </div>
    </div>
  );
}