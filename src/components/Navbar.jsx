import { useSelector } from "react-redux";
import {Link} from "react-router-dom" ; 
import { useNavigate } from "react-router-dom";
import {BASE_URL} from "../utils/constants" ; 
import axios from "axios" ; 
const NavBar = () => {

  const user = useSelector((store) => store.user) ; 
  const navigate = useNavigate() ; 
  console.log("from the navbar",user) ; 

  const handleLogout = async () => {
    console.log("handlelogout") ; 
    try{
      await axios.post(BASE_URL + "/logout" , {} , {withCredentials: true} ) ; 
      return navigate("/login") ; 
    } catch(Error){
      console.log(Error) ; 
    }
  }

  return (
    <>
      <div className="navbar bg-base-300">
        <div className="flex-1">
          <Link to = "/" className="btn btn-ghost text-xl">DevTinder </Link>
        </div>
        {user && <div className="flex-none gap-2">
          <div>{user.data.firstName}</div>
          <div className="dropdown dropdown-end">
            <div 
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src = {user.data.photoUrl}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to = "/profile" className="justify-between">
                  Profile
                  {/* <span className="badge">New</span> */}
                </Link>
              </li>
              <li>
                <Link to = "/connections" className="justify-between">
                  Friends
                  {/* <span className="badge">New</span> */}
                </Link>
              </li>
              <li>
                <Link to = "/requests" className="justify-between">
                  Requests Received
                  {/* <span className="badge">New</span> */}
                </Link>
              </li>
              <li>
                <a onClick={handleLogout} >Logout</a>
              </li>
            </ul>
          </div>
        </div>}
      </div>
    </>
  );
};

export default NavBar;
