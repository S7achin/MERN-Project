import React, {useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App'

const Logout = () => {

  const {state, dispatch} = useContext(UserContext);

  const history = useNavigate()
  useEffect(() => {
    fetch('/logout', {
        method: "GET",
        headers: {
        "Content-Type": "application/json"
        }
    }).then((res)=>{
        if(res.status === 200){
          dispatch({type: "USER", payload: false})
            history('/login');
        }
        else{
            const error = new Error(res.error);
            throw error;
        }
    }).catch((err)=> console.log(err));
  });


  return (
    <>
      {/* <h1>Logout Page</h1> */}
    </>
  )
}

export default Logout
