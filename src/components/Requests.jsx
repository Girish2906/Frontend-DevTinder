import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addRequests } from "../utils/requestSlice";
const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const response = await axios.get(BASE_URL + "/requests", {
        withCredentials: true,
      });
      console.log("this is the response", response.data.data);
      dispatch(addRequests(response.data.data));
    } catch (Error) {
      console.log(Error);
    }
  };

  const reviewRequests = async (status , _id) => {
    console.log("review requests") ; 
    try{
        const response = await axios.post(BASE_URL + "/request/review/" + status + "/" +  _id , {}, {withCredentials: true}) ;
        dispatch(removeRequests(_id)) ; 
    } catch(Error){
        console.log(Error) ; 
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return;
  if (requests.length === 0)
    return (
      <div className="flex flex-col justify-center my-10 w-1/2 m-auto">
        <h1 className="text-bold text-2xl text-center text-3xl font-bold">
          No Requests Received
        </h1>
      </div>
    );
  return (
    <div className="flex flex-col justify-center my-10 w-1/2 m-auto">
      <h1 className="text-bold text-2xl text-center text-3xl font-bold">
        Requests Received
      </h1>
      {requests.map((request) => {
        const {_id} = request ; 
        const {  firstName, lastName, photoUrl, gender, skills } = request.fromUserId;
        return (
          <div key = {_id} className="justify-between flex m-4 p-4 rounded-lg bg-base-300">
            <div>
              <img className="w-20 h-20" src={photoUrl} alt="image" />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-2xl">{firstName + " " +  lastName}</h2>
              <p>{gender}</p>
              <p>{skills.join(", ")}</p>
            </div>
            <br />
            <div className="flex my-3 py-4 ">
                <button className="btn btn-primary mx-3" onClick={() => reviewRequests("rejected" , _id)} >Reject</button>
                <button className="btn btn-secondary" onClick={() => reviewRequests("accepted" , _id)}>Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
