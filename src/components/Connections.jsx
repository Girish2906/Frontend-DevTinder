import React , {useEffect} from 'react' ; 
import { BASE_URL } from '../utils/constants' ; 
import axios from 'axios' ; 
import {useDispatch, useSelector} from 'react-redux' ; 
import { addConnections } from '../utils/connectionSlice';
 
const Connections = () => {
    const connections = useSelector((store) => store.connections); 
    const dispatch = useDispatch() ; 
    const getConnections = async () => {
        try{
            const response = await axios.get(BASE_URL + '/friends' , {withCredentials: true}) ; 
            console.log(response) ; 
            dispatch(addConnections(response.data)) ;
        } catch(Error){
            console.log(Error) ; 
        } 
    } 
    useEffect( () => {
        getConnections() ;  
    } , []) ; 
    if(!connections) return ; 

    if(connections.length === 0){
        return <div className=' flex justify-center my-10'>
        <h1 className='text-bold text-2xl'>No Connections Found</h1>
    </div>
    }

  return (
    <div className='flex flex-col justify-center my-10 w-1/2 m-auto'>
        <h1 className='text-bold text-2xl text-center text-3xl font-bold'>Connections</h1>
        {connections.map(connection => {
            const {firstName , lastName , photoUrl , gender , skills} = connection ; 
            return <div className="flex m-4 p-4 rounded-lg bg-base-300">
                <div>
                    <img className="w-20 h-20" src={photoUrl} alt="image" />
                </div>
                <div className="text-left mx-4">
                    <h2 className='font-bold text-2xl'>{firstName + lastName}</h2>
                    <p>{gender}</p>
                    <p>{skills.join(', ')}</p>
                </div>
            </div>
        } )}
    </div>

  )
}

export default Connections
