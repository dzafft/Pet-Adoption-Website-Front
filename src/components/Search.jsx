import React, {useState, useContext, useEffect} from 'react';
import './Search.css';
import axios from 'axios';
import Pets from './Pets';
import UserNameContext from '../UserNameContext';
import { Select, Checkbox } from '@chakra-ui/react';
import { FormLabel, Input, Button, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb } from '@chakra-ui/react';



export default function Search(){
    const [adoptionStatus, setAdoptionStatus] = useState('')
    const [petType, setPetType] = useState('');
    const [name, setName] = useState('');
    const [isChecked, setIsChecked] = useState(false);    
    const [isLoading, setIsLoading] = useState(false)


    const [weightSlider, setWeightSlider] = useState([1, 100]);
    const [heightSlider, setHeightSlider] = useState([1, 100]);


    const {setPetList} = useContext(UserNameContext)


    const handleSearch = async () =>{
        setIsLoading(true)
        try{
            const res = await axios.get(`http://localhost:8080/pets?type=${petType}&weightmin=${weightSlider[0]}&weightmax=${weightSlider[1]}&heightmin=${heightSlider[0]}&heightmax=${heightSlider[1]}&adoptionStatus=${adoptionStatus}&name=${name}`)
            
            
            console.log(res.data)
            setPetList(res.data);
            setIsLoading(false)
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
                <label className='labelForCheckbox' htmlFor="checkbox" style={{ fontSize: '40px' }}>{isChecked? 'Advanced Search': 'Regular Search'}</label>
                <div className='regularSearch'>
                    <label className='petTypeLabel' htmlFor="petType">Species:</label>
                    <Select className='petType' value={petType} onChange={(e)=>setPetType(e.target.value)}  placeholder='Any'>
                        <option value='Dog'>Dog</option>
                        <option value='Cat'>Cat</option>
                    </Select>
                    <Checkbox checked={isChecked} onChange={handleChange} className='checkbox'></Checkbox>
                </div>
                {isChecked && (
                <div className='advancedSearch'>
                    <div className='advancedSearchTop'>
                        <div className='labelForNameContainer'>
                            <label className='labelForName' for='petNameInput'>Name: </label>
                            <Input className='petNameInput' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Pet name' />
                        </div>
                        <div className='labelForStatusContainer'> 
                            <label className='labelForadoptionStatus' for='adoptionStatus'>Status: </label>
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
                <Button className='searchButton' onClick={handleSearch}>Search</Button>
            </div>
            <Pets isLoading={isLoading} />
        </div>

    )
}