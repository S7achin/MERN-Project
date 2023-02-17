import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import signpic from "../images/signpic.png"

const Signup = () => {
  const history = useNavigate();
  const [user, setUser] = useState({
    name: "", email: "", phone: "", work: "", password: "", cpassword: ""
  })

  let name, value;
  const handleInputs = (e) => {
    // console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  }

  const PostData = async (e) => {
    e.preventDefault();

    const { name, email, phone, work, password, cpassword } = user;

    const res = await fetch('/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, phone, work, password, cpassword
      })
      
    })

    const data = await res.json();
    // console.log(data);
    // console.log(res.status);

    if (res.status === 422 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      window.alert("Registration Successfull");
      console.log("Registration Successfull");

      history('/login');
    }
  }

  return (
    <>
      <section className="signup">
        <div className='Container1 c1 mt-5 resp2'>
          <div className='signup-content'>
            <div className='signup-form'>
              <h1 className='form-title'>Sign up</h1>

              <form method='POST' className='register-form' id='register-form'>
                <div className='mb-3 box'>
                  <label htmlFor='name' className="form-label">
                    <i className="zmdi zmdi-account material-icons-name"></i>
                  </label>
                  <input type="name" name='name' className="name" id="name" placeholder='Enter Your Name' autoComplete='off' value={user.name} onChange={handleInputs} />
                </div>

                <div className="mb-1 box">
                  <label htmlFor="email" className="form-label"><i className="zmdi zmdi-email material-icons-name"></i></label>
                  <input type="email" name='email' className="email" id="email" placeholder='Enter Your Email' autoComplete='off' value={user.email} onChange={handleInputs} />
                </div>

                <div className="mb-3 box">
                  <label htmlFor="phone" className="form-label"><i className="zmdi zmdi-phone-in-talk"></i></label>
                  <input type="text" name='phone' className="phone" id="phone" placeholder='Enter Your Phone' autoComplete='off' value={user.phone} onChange={handleInputs} />
                </div>

                <div className='mb-3 box'>
                  <label htmlFor='work' className="form-label">
                    <i className="zmdi zmdi-slideshow material-icons-name"></i>
                  </label>
                  <input type="text" name='work' className="work" id="work" placeholder='Enter Your Profession' autoComplete='off' value={user.work} onChange={handleInputs} />
                </div>

                <div className='mb-3 box'>
                  <label htmlFor='password' className="form-label">
                    <i className="zmdi zmdi-lock material-icons-name"></i>
                  </label>
                  <input type="password" name='password' className="password" id="password" placeholder='Enter Your Password' autoComplete='off' value={user.password} onChange={handleInputs} />
                </div>

                <div className='mb-3 box'>
                  <label htmlFor='cpassword' className="form-label">
                    <i className="zmdi zmdi-lock material-icons-name"></i>
                  </label>
                  <input type="password" name='cpassword' className="cpassword" id="cpassword" placeholder='Confirm Your Password' autoComplete='off' value={user.cpassword} onChange={handleInputs} />
                </div>

                <button type='submit' className="btn signup" id='signup' onClick={PostData}>Register</button>

                <div className='signup-image'>
                  <figure>
                    <img src={signpic} className='signpic' alt="Registration pic" />
                  </figure>
                  <NavLink to='/login' className='signup-image-link'>I am already registered</NavLink>
                </div>

              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Signup
