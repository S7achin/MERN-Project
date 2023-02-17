import React, {useEffect, useState} from 'react'

const Contact = () => {

  const [userData, setUserData] = useState({name:'',email:'',phone:'',message:''});
   
  const userContact = async () => {
    try { 
      const res = await fetch('/getdata', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }); 

      const data = await res.json();
      setUserData({...userData, name:data.name, email:data.email, phone:data.phone});
      // console.log("Data of User",data);
      // console.log("userData",userData);
      

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }


    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    userContact();
  },[]);

  // We are storing data in state
  const handleInputs = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setUserData({...userData, [name]:value})
  }

  // Send the data to backend
  const contactForm = async (e)=>{
    e.preventDefault()
    // console.log("button clicked");
    // console.log(userData);
    const {name, email, phone, message} = userData;


    const res = await fetch('/contact',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,email,phone,message
      })
    });

    const data = await res.json();
    if(!data){
      console.log("Message Not Send")
    }else if(res.status === 400){
        alert("Plzz fill the message field")
    }
    else {
        alert("Message Send");
        setUserData({...userData, message:""})
      }
    
  }


  return (
    <>
      <div className='contact_info pt-4'>
        <div className='container white'>
          <div className='row'>
            <div className="col d-flex justify-content-between border ms-3">
              <div className='contact_info_item '>
                <div className='contact_info_title'>
                  <i className="zmdi zmdi-phone-in-talk"></i> Phone
                </div>
                <div className='contact_info_text'>
                  +91 98936 87788
                </div>
              </div>
            </div>
            <div className="col d-flex justify-content-between border ms-3">
              <div className='contact_info_item'>
                <div className='contact_info_title'>
                  <i className="zmdi zmdi-email material-icons-name"></i> Email
                </div>
                <div className='contact_info_text'>
                  sachinmalviya7205@gmail.com
                </div>
              </div>
            </div>
            <div className="col d-flex justify-content-between border ms-3">
              <div className='contact_info_item '>
                <div className='contact_info_title'>
                  <i className="zmdi zmdi-home"></i> Address
                </div>
                <div className='contact_info_text'>
                  Gurjar Kheda, Tarana, Ujjain(M.P.), 456770
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Contact form */}
      <div className='contact_form'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-10 offset-lg-1 design'>
              <div className='contact_form_container my-4'>
                <div className='contact_form-title white'>
                  <h2>Get In Touch</h2>
                  <form method="POST" id='contact_form'>
                    <div className='box contact_form_name d-flex justify-content-between align-items-between'>
 
                      <input type="text" id="contact_form_name" className='contact_form_name input_field border' placeholder='Your Name' name='name' value={userData.name} readOnly={true} required={true} />

                      <input type="email" id="contact_form_email" className='contact_form_email input_field border' placeholder='Your Email' name='email' value={userData.email} readOnly={true} required={true} />

                      <input type="text" id="contact_form_phone" className='contact_form_phone input_field border' placeholder='Your Phone Number' name='phone' value={userData.phone} readOnly={true} required={true} />
                    </div>

                    <div className='contact_form_text mt-2'>
                      <textarea className='text_field contact_form_message border'
                      name='message' value={userData.message} onChange={handleInputs} 
                      placeholder='Message' cols='90' rows='7'></textarea>
                    </div>

                    <div className='contact_form_button'>
                     <button type='submit' className="btn signup send" 
                     onClick={contactForm} id='signup'>Send Message</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
