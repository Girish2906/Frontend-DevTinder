import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const EditProfile = ({user}) => {
    console.log(user) ; 
    const [firstName , setFirstName] = useState(user.data.firstName) ; 
    const [lastName , setLastName] = useState(user.data.lastName) ; 
    const [skills , setSkills] = useState(user.data.skills) ; 
    const [photoUrl , setPhotoUrl] = useState(user.data.photoUrl) ; 
    const [error , setError] = useState('') ;
    const dispatch = useDispatch() ; 

    const saveProfile = async () => {
        setError('') ; 
        try{
            const response = await axios.put(BASE_URL + '/profile/edit' , {firstName , lastName , skills , photoUrl} , {withCredentials: true}) ; 
            dispatch(addUser(res?.data?.data)) ; 
        } catch(Error){
            setError(error.response) ; 
        } 
    }

  return (
    <>
    <div className="flex justify-center my-10">
    <div className="card bg-base-100 image-full w-96 shadow-xl justify-content:center">
      <figure></figure>
      <div className="card-body">
        <h2 className="card-title justify-center">Edit Profile</h2>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">First Name:</span>
          </div>
          <input
            type="text"
            value={firstName}
            placeholder="Enter First Name"
            onChange={(e) => setFirstName(e.target.value)}
            className="input input-bordered w-full max-w-xs bg-blue-100 text-black"
          />
         <div className="label">
            <span className="label-text my-2">Last Name:</span>
          </div>
          <input
            type="text"
            value={lastName}
            placeholder="Enter Last Name"
            onChange={(e) => setLastName(e.target.value)}
            className="input input-bordered w-full max-w-xs bg-blue-100 text-black"
          />
           <div className="label">
            <span className="label-text my-2">Skills:</span>
          </div>
          <input
            type="text"
            value={skills}
            placeholder="Enter Last Name"
            onChange={(e) => setSkills(e.target.value)}
            className="input input-bordered w-full max-w-xs bg-blue-100 text-black"
          />
          <div className="label">
            <span className="label-text my-2">Photo URL:</span>
          </div>
          <input
            type="text"
            value={photoUrl}
            placeholder="Enter Profile URL"
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="input input-bordered w-full max-w-xs bg-blue-100 text-black"
          />
        </label>
        <p> {error && error.message}</p>
        <div className="card-actions justify-end my-2">
          <button className="btn btn-primary" onClick={saveProfile}>
            Save Profile
          </button>
        </div>
      </div>
    </div>
    <UserCard user = {{firstName , lastName , skills , photoUrl}} />
  </div>
  {/* <UserCard user = {{firstName , lastName , skills , photoUrl}} /> */}
    </>
  )
}

export default EditProfile ; 
