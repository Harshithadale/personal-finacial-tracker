import React, { use, useEffect } from 'react'
import { auth } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from "firebase/auth";
import './style.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate()
    useEffect(()=>{
      if(user){
        console.log(user)
          navigate("/dashboard")
      }
    },[user,loading])
    function logoutFunc(){
      try{
        signOut(auth).then(() => {
          // Sign-out successful.
          toast.success("Logged Out Successfully!")
          navigate("/")
        }).catch((error) => {
          // An error happened.
          toast.error(error.message)
        })
      }
      catch(e){
        toast.error(e.message)
      }
    }
  return (
    <div className='navbar'>
        <p className='logo'>Financly.</p>
        {user&&
        <div style={{display:"flex", alignItems:"center", gap:"0.75rem"}}>
          {user.photoURL ? 
          <img src={user.photoURL} style={{height:"2rem",width:"2rem", borderRadius:"50%"}}
          />:
         <img width="48" height="48" src="https://img.icons8.com/fluency/48/user-male-circle--v1.png" alt="user-male-circle--v1"/>}
        <p className='logo link' onClick={logoutFunc}>Logout</p>
        </div>}
    </div>
  )
}

export default Header