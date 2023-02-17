import React, { useContext, useState } from 'react'
import loginpic from "../images/loginpic.png"
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../App'

const Login = () => {

  const {state, dispatch} = useContext(UserContext);

  const history = useNavigate();
  // const [user, setUser] = useState({email:"",password:""})
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch('/signin', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    })

    const data = await res.json()
    if(res.status === 404 || !data){
      window.alert("Invalid Login Credentials");
      // console.log("Invalid Login Credentials");
    }else{
      dispatch({type: "USER", payload: true})
      window.alert("User SignIn successfull");
      // console.log("User SignIn successfull");
      history('/')
    }
  }
  return (
    <>
      <div className='row text_field'>

        <div className='signin-image col'>
          <figure>
            <img src={loginpic} className='loginpic' alt="Login pic" />
          </figure>
          <NavLink to='/signup' className='signin-image-link'>Create an Account</NavLink>
        </div>

        <div className="Container1 col resp">
          <h1>Sign In</h1>
          <form method='POST'>
            <div className="box">
              <i className="zmdi zmdi-email material-icons-name"></i>
              <input type="email" name="email" id="email" placeholder="Enter Your Email" autoComplete='off' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="box">
              <i className="zmdi zmdi-lock material-icons-name"></i>
              <input type="password" name="password" id="password" placeholder="Enter Your Password" autoComplete='off' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type='submit' className="btn" onClick={loginUser}>Log In</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
