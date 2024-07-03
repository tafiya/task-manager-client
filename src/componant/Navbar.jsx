import { Link } from "react-router-dom";
import { IoCreateOutline } from "react-icons/io5";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const Navbar = () => {
  const {user,logOut}=useContext(AuthContext);
    const navOption=<>
    <li><Link className="hover:text-[#265073] font-medium text-lg" to='/'>Home</Link></li>
<li><Link className="hover:text-[#265073] font-medium text-lg" to='/create'> <IoCreateOutline />Create </Link></li>
    </>
        const handleLogOut=()=>{
          logOut()
          .then(()=>{})
          .catch(error=>console.log(error))
        }
    return (
        <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
           {navOption}
            </ul>
          </div>
          <a className=" text-[#2F27CE] font-bold text-2xl">TaskMaster</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
        {navOption}
          </ul>
        </div>
        <div className="navbar-end">
          {
            user?<div className="dropdown ml-2 dropdown-end text-yellow-500">
            <label tabIndex={0} className=""><button><img src={user.photoURL? user.photoURL:profile} alt="" className=" border rounded-full sm:h-12 h-8 w-8 sm:w-12" /></button></label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a className="text-yellow-500 text-base font-semibold">{user.displayName}</a></li>
              <li><a><button className="hover:btn btn-outline text-yellow-500   " onClick={handleLogOut}>Logout</button></a></li>
    
            </ul>
          </div>: <div><Link to="/login" className="btn">Sign in</Link></div> 
          }
         
        </div>
      </div>
    );
};

export default Navbar;