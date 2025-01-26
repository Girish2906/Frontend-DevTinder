import React from 'react' ; 
import axios from 'axios' ; 
import { BASE_URL } from '../utils/constants' ; 
import { useSelector , useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { addFeed , removeUserFromFeed} from '../utils/feedSlice' ;
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector(store => store.feed) ; 
  console.log("this is the feed" , feed) ; 
  const dispatch = useDispatch() ; 

  const getFeed =  async () => {
    console.log("!@$%!#@") ; 
    if(feed){
      return ; 
    }
    try{
      const response = await axios.get(BASE_URL + '/feed' , {withCredentials: true}) ; 
      console.log("!@$#@",response); 
      dispatch(addFeed(response.data.data)) ; 
    } catch(Error){
      console.log(Error) ; 
    }
  } ; 
  useEffect(() => {
    getFeed()
  } , []) ; 
  if(!feed?.length) return (<div className='text-center font-bold text-3xl my-10'>
    <h1>No More Users</h1>
  </div>) ; 
  return ( feed && 
    <div className=' flex justify-center my-10'>
      <UserCard user = {feed[0]} />

    </div>
  )
}

export default Feed ; 
