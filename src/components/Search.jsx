import React, {useState, useRef, useContext, useEffect} from 'react';
import './Search.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Pets from './Pets';
import UserNameContext from '../UserNameContext';
import {Select, Switch} from '@chakra-ui/react';
import {FormLabel, Input, Button, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb } from '@chakra-ui/react';



export default function Search(){
    const checkboxRef = useRef(null);
    const location = useLocation();
    const [petType, setPetType] = useState('');
    const [name, setName] = useState('');
    const [isChecked, setIsChecked] = useState(false);    
    const [adoptionStatus, setAdoptionStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false)


    const [weightSlider, setWeightSlider] = useState([1, 100]);
    const [heightSlider, setHeightSlider] = useState([1, 100]);


    const {setPetList} = useContext(UserNameContext);

    useEffect(()=>{
        if (checkboxRef.current) {
            checkboxRef.current.checked = true;
        }
        else{
            console.log('checkkkkkk')
        }
        const searchParams = new URLSearchParams(location.search);
        const availableRedirect = searchParams.get('availableRedirect');
        const isTrue = searchParams.get('isTrue');
        if (checkboxRef.current ) {
            checkboxRef.current.checked = true;
        }

        if (availableRedirect && isTrue){
            setAdoptionStatus(availableRedirect);
            setIsChecked(isTrue);
        }


    }, [location.search]);



    const handleSearch = async () =>{
        setIsLoading(true)
        try{
            console.log(name, petType, weightSlider, heightSlider)
            const res = await axios.get(`http://localhost:8080/pets?type=${petType}&weightmin=${weightSlider[0]}&weightmax=${weightSlider[1]}&heightmin=${heightSlider[0]}&heightmax=${heightSlider[1]}&adoptionStatus=${adoptionStatus}&name=${name}`)
            
            
            console.log(res.data);
            setPetList(res.data);
            setIsLoading(false);
        }
        catch (err){
            console.log(err)
        }
    }

    useEffect(()=>{
        console.log(petType)
    }, [petType])

    



    const handleChange = () =>{
        setIsChecked(!isChecked);
    }

    const handleHeightSlider = (values) =>{
        setHeightSlider(values)
    }

    const handleWeightSlider = (values) =>{
        setWeightSlider(values)
    }

    
    return (
        <div className='searchContainer'>
            <div className='searchFormContainer'>
                <FormLabel className='labelForCheckbox' htmlFor="switch" style={{ fontSize: '40px' }}>{isChecked? 'Advanced Search': 'Regular Search'}</FormLabel>
                <div className='regularSearch'>
                    <FormLabel className='petTypeLabel' htmlFor="petType">Species:</FormLabel>
                    <Select className='petType' value={petType} onChange={(e)=>setPetType(e.target.value)}  placeholder='Any'>
                        <option value='Dog'>Dog</option>
                        <option value='Cat'>Cat</option>
                    </Select>
                    <FormLabel className='labelForSwitch' HtmlFor='switch'>Advanced Search?</FormLabel>
                    <Switch colorScheme='red' size='lg' ref={checkboxRef} checked={isChecked} onChange={handleChange} className='switch'></Switch>
                </div>
                {isChecked && (
                <div className='advancedSearch'>
                    <div className='advancedSearchTop'>
                        <div className='labelForNameContainer'>
                            <FormLabel className='labelForName' htmlFor='petNameInput'>Name: </FormLabel>
                            <Input className='petNameInput' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Pet name' />
                        </div>
                        <div className='labelForStatusContainer'> 
                            <FormLabel className='labelForadoptionStatus' HtmlFor='adoptionStatus'>Status: </FormLabel>
                            <Select className='adoptionStatus' value={adoptionStatus} onChange={(e)=>setAdoptionStatus(e.target.value)} placeholder='Any'>
                                    <option value="Adopted">Adopted</option>
                                    <option value="Fostered">Fostered</option>
                                    <option value="Available">Available</option>
                            </Select>
                        </div>
                    </div>
                    <div className='advancedSearchBottom'>
                        <FormLabel htmlFor='heightSlider'>Height: Between {heightSlider[0]} and {heightSlider[1]}</FormLabel>
                        <RangeSlider id='heightSlider' onChange={handleHeightSlider} value={heightSlider} min={1} max={100}>
                            <RangeSliderTrack bg='blue.100'>
                                <RangeSliderFilledTrack bg='black' />
                            </RangeSliderTrack>
                            <RangeSliderThumb boxSize={6} index={0} />
                            <RangeSliderThumb boxSize={6} index={1} />
                        </RangeSlider>
                        <FormLabel htmlFor='heightSlider'>Weight: Between {weightSlider[0]} and {weightSlider[1]}</FormLabel>
                        <RangeSlider onChange={handleWeightSlider} value={weightSlider} min={1} max={100}>
                            <RangeSliderTrack bg='blue.100' >
                                <RangeSliderFilledTrack bg='black' />
                            </RangeSliderTrack>
                            <RangeSliderThumb boxSize={6} index={0} />
                            <RangeSliderThumb boxSize={6} index={1} />
                        </RangeSlider>
                    </div>
                </div>)}
                <Button colorScheme='teal' loadingText='Loading' isLoading={isLoading} className='searchButton' onClick={handleSearch}>Search</Button>
            </div>
            <Pets isLoading={isLoading} />
        </div>

    )
}