import React from 'react' ; 
import NavBar from './Navbar' ; 
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { useEffect } from 'react';
import {addUser} from "../utils/userSlice" ; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Body = () => {

  const dispatch = useDispatch() ; 
  const navigate = useNavigate() ; 
  const fetchUser = async () => {
    try{
      const response = await axios.get(BASE_URL + "/profile/view" , {
        withCredentials: true
      }) ; 
      dispatch(addUser(response)) ; 
    } catch(Error){
      navigate('/login') ; 
      console.error(Error) ; 
    }
  } ; 

  useEffect(() => {
    fetchUser() ; 
  } , []) ; 

  return (
    <div>
        <NavBar/>
        <Outlet className="bg-blue-300"/>
        <Footer/>
    </div>
  )
}

export default Body ; 