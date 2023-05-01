import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function HomePage(){
  
  const location = useLocation();

  return (
    <div className='homePage'>
      <h1>Greetings Master {location.state.id}. Nigh shall you be gifted an animal commensurate with the money you bestow upon us.</h1>
    </div>
  );
}