import React, {useEffect, useState}  from 'react'
// import { BrowserRouter } from 'react-router-dom'

const Home = () => {

  const [userName, setUser] = useState('');
  const [show, setShow] = useState(false);
  
  const userHomePage = async () => {
    try { 
      const res = await fetch('/getdata', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }); 

      const data = await res.json();
      setUser(data.name);
      setShow(true);
      
    } catch (error) {
      console.log(error);
    }
  }
  

  useEffect(() => {
    userHomePage();
  },[]);

  return (
    <>
      <div className='home-page'>
        <div className='home-div white'>
          <h5>WELCOME</h5>
          <h1 className='hometitle'>{userName}</h1>
          <h1 className='homesubtitle'>{ show ? 'Happy, to see you back' : 'We Are The MERN Developer'}</h1>
        </div>
      </div>

    </>
  )
}

export default Home
