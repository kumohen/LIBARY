import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../actions/user_action";
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {

    const [password, setPassword] = useState("123456");
    const [roll_no, setRoll_no] = useState("CS3150")
    const dispatch = useDispatch()

    const PostData = () => {
        const user = { password, roll_no }
        dispatch(loginUser(user))
    };

    return (
        <div >
            <div className="LoginPage"></div>
            <div className="login_container">
               
                    <div className="col-md-6 m-auto" style={{opacity:1}}>
                        <div style={{marginLeft:"37%"}}>
                        <div id="circle"></div>
                          <h3 className="LMS" style={{fontFamily:"sans-serif"}}>LMS</h3>
                        </div>
                        <p style={{color:"white",fontWeight:"800",textAlign:"center"}}>Welcome to Libary
Management System</p>
                    <div>
                        <input type="text" className="form-control" style={{height:"60px",borderRadius:"20px"}}
                         placeholder="roll_no" value={roll_no} onChange={(e) => setRoll_no(e.target.value)} />
                    </div>
                    <br />
                    <div>
                        <input type="text"  style={{height:"60px",borderRadius:"20px"}}
                        className="form-control" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                     <br />



                    <button style={{width:"100%",height:"60px",color:"white",borderRadius:"20px",backgroundColor:"red"}} onClick={() => PostData()}>
                        Login 
                    </button>
                    </div>
                    <br />
                    <Link to="/register"  style={{fontFamily:"sans-serif",color:"white",textDecoration:"none"}}>if u don't have account then plz Register</Link>
               
            </div>
        </div>
    );
};



export default Login;