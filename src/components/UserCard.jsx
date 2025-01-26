import React from 'react'
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';
const UserCard = ({user}) => {
    console.log("usercard ",user) ; 
    const {firstName , lastName , skills , gender , photoUrl , _id} = user ; 
    const dispatch = useDispatch() ; 
    const handleSendRequest = async (status , _id) => {
      console.log(11 , status , _id) ; 
      try{
        const response = await axios.post(BASE_URL + "/request/" + status + "/" + _id , {} , {
          withCredentials: true
        } ) ; 
        dispatch(removeUserFromFeed(_id)) ;
      }catch(Error){
        console.log(Error) ; 
      }
    } 

  return (
    <div className="card bg-gray-100 w-96 shadow-xl bg-color-red">
  <figure>
    <img
      src={photoUrl}
      alt="Users's Image" />
  </figure>
  <div className="card-body">
    <h1 className="card-title">{firstName + " " + lastName}</h1>
    <h2 className="card-title">{gender}</h2>
    <p>{skills.join(', ')}</p>
    <div className="card-actions justify-center my-4">
    <button className="btn btn-primary" onClick = {() => handleSendRequest("ignored" , _id)}>Ignore</button>
      <button className="btn btn-secondary" onClick = {() => handleSendRequest("interested" , _id )}>Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard ; 