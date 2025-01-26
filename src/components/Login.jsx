import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from "../utils/constants" ;

const Login = () => {
  const [email, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName , setFirstName] = useState("") ; 
  const [lastName , setLastName] = useState("") ; 
  const [gender , setGender] = useState("") ; 
  const [isLoginForm , setIsLoginForm] = useState(true) ; 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginError , setLoginError] = useState(false) ; 

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      dispatch(addUser(response.data));
      navigate("/");
    } catch (Error) {
      setLoginError(true) ; 
      console.log(Error);
    }
  };

  const signUpForm = async () => {
    console.log("signUPForm") ; 
    try{
      const res = await axios.post(BASE_URL + "/signUp" , {firstName , lastName , gender , email , password} , {withCredentials: true} )  ; 
      console.log(res) ; 
      // console.log(42 , res.data) ; 
      dispatch(addUser(res.data)) ; 
      return navigate("/profile") ; 
    } catch(Error){
      console.log(Error) ; 
    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-100 image-full w-96 shadow-xl justify-content:center">
        <figure></figure>
        <div className="card-body">
          <h2 className="card-title justify-center">{isLoginForm ? "Login" : "SignUp"}</h2>
          <label className="form-control w-full max-w-xs">
          { !isLoginForm && <div>
            <div  className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="text"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input input-bordered w-full max-w-xs bg-blue-100 text-black"
              />
          </div>}
           { !isLoginForm && <div>
            <div className="label">
              <span className="label-text">Last Name</span>
            </div>
            <input
              type="text"
              placeholder="Enter Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input input-bordered w-full max-w-xs bg-blue-100 text-black"
            />
           </div> }
           { !isLoginForm && <div>
            <div className="label">
              <span className="label-text">Gender</span>
            </div>
            <input
              type="text"
              placeholder="Enter Last Name"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="input input-bordered w-full max-w-xs bg-blue-100 text-black"
            />
           </div> }
            <div className="label">
              <span className="label-text">Email ID</span>
            </div>
            <input
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmailId(e.target.value)}
              className="input input-bordered w-full max-w-xs bg-blue-100 text-black"
            />
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="text"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full max-w-xs bg-blue-100 text-black"
            />
            {loginError && <p className="text-red-500 mt-2">Invalid Credentials</p>}
          </label>
          <div className="card-actions my-3 justify-center">
            <button className="btn btn-primary" onClick={ isLoginForm ? handleLogin : signUpForm }>
              Login
            </button>
          </div>
          <p className="text-center cursor-pointer" onClick={() => setIsLoginForm(!isLoginForm)}>
            {isLoginForm ? "New User? Sign Up Here" : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
