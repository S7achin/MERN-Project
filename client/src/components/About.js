import React, { useEffect , useState} from 'react'
import pic from "../images/Sachin.png"
import aboutpic from "../images/viru.png";
import { useNavigate } from 'react-router-dom'

const About = () => {
  const history = useNavigate();
  const [userData, setUserData] = useState({});
   
  const callAboutPage = async () => {
    try { 
      const res = await fetch('/about', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      }); 

      const data = await res.json();
      setUserData(data);
      // console.log("Data of Autherized User",data);
      

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }


    } catch (error) {
      console.log(error);
      history('/login');
    }
  }

  useEffect(() => {
    callAboutPage();
  },[]);

  return (
    <>
      <div className='container emp-profile border mt-5'>
        <form method='GET'>

          <div className='row'>
            <div className='col-md-4'>
              <div className='profile-img'>
                <img src={userData.name === "Sachin Kumar Malviya" ? pic : aboutpic} className='img' alt='Picture' />
              </div>
            </div>

            <div className='col-md-6'>
              <div className='profile-head white'>
                <h5>{userData.name}</h5>
                <h6>{userData.work}</h6>
                <p className='profile-rating mt-3 mb-5'>RANKING: <span>1/10</span></p>

                <ul className="nav line" role='tablist'>
                  <li className="nav-item">
                    <a className="nav-link active" id='home-tab' data-bs-toggle="tab" aria-controls='home' aria-selected="true" href="#home" role='tab'>About</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id='profile-tab' data-bs-toggle="tab" aria-controls='profile' aria-selected="false" href="#profile" role='tab'>Timeline</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className='col-md-2'>
              <input type='submit' name='btnAddMore' className='profile-edit-btn' value='Edit Profile' />
            </div>
          </div>

          <div className='row'>
            {/* Left side url */}
            <div className='col-md-4'>
              <div className='profile-work white'>
                <p>WORK LINK</p>
                <a className='link' href="https://github.com/S7achin" target="_sp">Github</a><br />
                <a className='link' href="https://www.instagram.com/sachin_malviya.7205/" target="_sp">Instagram</a><br />
                <a className='link' href="https://www.linkedin.com/in/sachin-malviya-9a5b431b4/" target="_sp">Linkedin</a><br />
                <a className='link' href="https://github.com/S7achin" target="_sp">Youtube</a><br />
                <a className='link' href="https://github.com/S7achin" target="_sp">Facebook</a><br />
                <a className='link' href="https://github.com/S7achin" target="_sp">Web Developer</a><br />
              </div>
            </div>


            {/* Right side data toggle */}
            <div className='col-md-8 pl-5 about-info'>
              <div className="tab-content profile-tab" id="myTabContent">

                <div className="tab-pane fade show active mt-2" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <div className="row white">
                    <div className="col-md-6">
                      <label>User ID</label>
                    </div>
                    <div className="col-md-6">
                      <p>19562</p>
                    </div>
                  </div>
                  <div className="row white  mt-2">
                    <div className="col-md-6">
                      <label>Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.name}</p>
                    </div>
                  </div>
                  <div className="row white  mt-2">
                    <div className="col-md-6">
                      <label>Email</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.email}</p>
                    </div>
                  </div>
                  <div className="row white  mt-2">
                    <div className="col-md-6">
                      <label>Phone</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.phone}</p>
                    </div>
                  </div>
                  <div className="row white  mt-2">
                    <div className="col-md-6">
                      <label>Profession</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.work}</p>
                    </div>
                  </div>
                </div>

                <div className="tab-pane fade mt-2" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                  <div className="row white">
                    <div className="col-md-6">
                      <label>Experience</label>
                    </div>
                    <div className="col-md-6">
                      <p>Expert</p>
                    </div>
                  </div>
                  <div className="row white  mt-2">
                    <div className="col-md-6">
                      <label>Hourly Rate</label>
                    </div>
                    <div className="col-md-6">
                      <p>10$/h</p>
                    </div>
                  </div>
                  <div className="row white  mt-2">
                    <div className="col-md-6">
                      <label>Total Project</label>
                    </div>
                    <div className="col-md-6">
                      <p>10</p>
                    </div>
                  </div>
                  <div className="row white  mt-2">
                    <div className="col-md-6">
                      <label>English level</label>
                    </div>
                    <div className="col-md-6">
                      <p>Professional</p>
                    </div>
                  </div>
                  <div className="row white  mt-2">
                    <div className="col-md-6">
                      <label>Availability</label>
                    </div>
                    <div className="col-md-6">
                      <p>6 Months</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default About
