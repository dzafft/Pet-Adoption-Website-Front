import './App.css';
import React, {useState} from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import MyAccount from './components/MyAccount';
import SavedPets from './components/SavedPets';
import UserNameContext from './UserNameContext';
import Search from './components/Search';
import PetCard from './components/PetCard';
import MyPets from './components/MyPets'; 
import Dashboard from './components/Dashboard';
import OpenPerson from './components/OpenPerson';

function App() {

  const {pathname} = useLocation();
  const isPetCardPage = pathname.includes('/pets/');
  const [currentUser, setCurrentUser] = useState(null);
  const [fosterList, setFosterList] = useState([]);
  const [petList, setPetList] = useState([]);

  
  return (
    <>
      <UserNameContext.Provider value={{ petList, setPetList, currentUser, setCurrentUser, fosterList, setFosterList}}>
      
      {!isPetCardPage && <Navbar />}
      <Routes>
        <Route path= '/homepage' element= {<HomePage />}  />
        <Route path = '/dashboard' element = {<Dashboard />} />
        <Route path = '/login' element={<Login />} />
        <Route path = '/signup' element={<Signup />} />
        <Route path = '/myaccount' element = {<MyAccount />} />
        <Route path = '/savedpets' element = {<SavedPets />} />
        <Route path = '/search' element = {<Search />} />
        <Route path = '/pets/:id' element = {<PetCard />} />
        <Route path = '/mypets' element = {<MyPets />} />
        <Route path = '/person/:id' element = {<OpenPerson />} />
        

      </Routes>
      </UserNameContext.Provider>
    </>
  );
}

export default App;
