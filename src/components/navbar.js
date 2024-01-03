import React, { useContext, useState,useEffect } from "react";
import { Link } from "react-router-dom";
import cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";
import "../App.css"


//Navbar components
const  Navbar=()=>{
    const[userDetails,setUserdetails,notification,setNotification]=useContext(userContext);
    const token=cookie.get("token");
    const navigate=useNavigate();
    const logout=()=>{
        cookie.remove("token");
        setUserdetails({});
        navigate("/login");
        window.location.reload()
    }
    const[right,setRight]=useState(-200);
    const[tim,settim]=useState(0);
    useEffect(() => {
        let timer;
      
    if(notification){
        timer = setInterval(() => {
            if(right<50 && tim===0){
                setRight(right+1);
            }else{
                if(tim<300){
                    settim(tim+1);
                }else{
                    if(right>=-200){
                        setRight(right-1);
                    }else{
                        setNotification('');
                        setRight(-200);
                        settim(0);
                    }
                }
            }
            
          }, 4); // 1000 milliseconds = 1 second
        } else {
          clearInterval(timer);
        }
        return () => {
            clearInterval(timer); // Cleanup: clear the timer when the component unmounts
          };
        }, [right,notification,tim]);
    return(
        <div className="navbar"style={{display:"flex",overflow:"hidden",justifyContent:"center",
        position:"sticky",top:"0",zIndex:"1",
        backgroundColor:"InactiveBorder",width:"100%"}}>
        <Link to='/'><h1 className="text-center my-4 text-primary ">{userDetails.name?`${userDetails.name.slice(0,1).toUpperCase()+userDetails.name.slice(1)}'s `:""}Task Manager</h1></Link>
                <div style={{position:"relative",left:"15%"}}>
                    {
                            token?<button onClick={logout} className="btn btn-primary navbtn mx-4 my-4">Logout</button>:
                                <>
                                <Link to='/register'><button className="btn navbtn btn-primary mx-4 my-4">Register</button></Link>
                                <Link to='/login'><button className="btn navbtn btn-primary mx-4 my-4">Login</button></Link>
                                </>
                        }
                </div>
                        {notification && <div className="side-notification" style={{right:right}}>
                            <p>{notification}</p>
                        </div>}
        </div>

    )
}

export default Navbar;